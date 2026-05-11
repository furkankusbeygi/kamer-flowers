"use client";
import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Search, Loader2, Image as ImageIcon, UploadCloud } from 'lucide-react';

// KANKA BURAYA KENDİ CLOUDINARY BİLGİLERİNİ YAZACAKSIN
const CLOUD_NAME = "dzu7m0xei"; 
const UPLOAD_PRESET = "kamerflowers"; // Örn: ml_default

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  // Resim yüklenirken dönecek spiner için state
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({ name: '', price: '', stock: 0, description: '', imageUrl: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Ürünler çekilirken hata:", error);
      setLoading(false);
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ 
        name: product.name, 
        price: product.price, 
        stock: product.stock, 
        description: product.description,
        imageUrl: product.imageUrl || '' 
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', stock: 0, description: '', imageUrl: '' });
    }
    setIsModalOpen(true);
  };

  // --- CLOUDINARY RESİM YÜKLEME FONKSİYONU ---
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data,
      });
      const uploadedImage = await res.json();
      
      // Cloudinary'den gelen güvenli URL'i form state'ine yaz
      setFormData({ ...formData, imageUrl: uploadedImage.secure_url });
      setImageUploading(false);
    } catch (error) {
      console.error("Resim yükleme hatası:", error);
      alert("Resim yüklenemedi kanka, bağlantıyı kontrol et.");
      setImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchProducts(); 
      } else {
        alert("Ürün eklenirken bir sorun oluştu.");
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-800">Ürünler</h1>
          <p className="text-neutral-500 mt-1">Koleksiyonunuzdaki tüm ürünleri buradan yönetin.</p>
        </div>
        <button onClick={() => openModal()} className="bg-neutral-900 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-rose-500 transition-all font-medium shadow-lg hover:shadow-rose-200">
          <Plus size={20} /> Yeni Ürün Ekle
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        {loading ? (
          <div className="p-10 flex justify-center text-rose-500"><Loader2 className="animate-spin" size={32} /></div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 text-sm">
              <tr>
                <th className="p-5 font-medium w-16">Görsel</th>
                <th className="p-5 font-medium">Ürün Adı</th>
                <th className="p-5 font-medium">Fiyat (TL)</th>
                <th className="p-5 font-medium">Stok</th>
                <th className="p-5 font-medium">Durum</th>
                <th className="p-5 font-medium text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan="6" className="p-10 text-center text-neutral-400 font-medium">Henüz ürün eklenmemiş kanka. İlk ürününü ekle!</td></tr>
              ) : (
                products.map(product => (
                  <tr key={product._id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                    <td className="p-5">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={16} className="text-neutral-300" />
                        )}
                      </div>
                    </td>
                    <td className="p-5 font-bold text-neutral-800">{product.name}</td>
                    <td className="p-5 text-neutral-600">₺{product.price}</td>
                    <td className="p-5">
                      <span className="bg-neutral-100 px-3 py-1 rounded-lg text-sm font-medium">{product.stock} Adet</span>
                    </td>
                    <td className="p-5">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold tracking-wide ${product.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="p-5 flex justify-end gap-2">
                      <button onClick={() => openModal(product)} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"><Edit2 size={18}/></button>
                      <button className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 size={18}/></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* --- MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white p-8 rounded-3xl w-full max-w-xl relative shadow-2xl my-8">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-rose-500 bg-neutral-100 p-2 rounded-full transition-colors"><X size={20} /></button>
            <h2 className="text-2xl font-serif italic font-bold mb-8 text-neutral-800">{editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Oluştur'}</h2>
            
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              
              {/* DOSYA YÜKLEME ALANI (Sürükle Bırak Hissiyatlı) */}
              <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                <label className="block text-xs font-bold text-neutral-500 tracking-wider mb-3">ÜRÜN GÖRSELİ</label>
                
                <div className="relative border-2 border-dashed border-neutral-300 rounded-xl hover:bg-rose-50 hover:border-rose-300 transition-colors cursor-pointer overflow-hidden group">
                  {/* Görünmez dosya inputu */}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    disabled={imageUploading}
                  />

                  <div className="p-8 flex flex-col items-center justify-center text-center gap-2">
                    {imageUploading ? (
                      <div className="flex flex-col items-center text-rose-500">
                        <Loader2 className="animate-spin mb-2" size={32} />
                        <span className="text-sm font-bold">Cloudinary'e Yükleniyor...</span>
                      </div>
                    ) : formData.imageUrl ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-contain" />
                        <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white font-bold text-sm bg-neutral-900/80 px-4 py-2 rounded-full flex items-center gap-2">
                            <UploadCloud size={16} /> Resmi Değiştir
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center text-neutral-400 group-hover:text-rose-500 transition-colors">
                        <UploadCloud size={40} className="mb-3" />
                        <p className="font-bold text-sm text-neutral-600">Tıklayın veya fotoğraf sürükleyin</p>
                        <p className="text-xs">PC veya Telefondan Seçin (Maks 5MB)</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 tracking-wider mb-2">ÜRÜN ADI</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50 focus:bg-white transition-colors" required />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 tracking-wider mb-2">FİYAT (TL)</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50 focus:bg-white transition-colors" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 tracking-wider mb-2">STOK ADEDİ</label>
                  <input type="number" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50 focus:bg-white transition-colors" required />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 tracking-wider mb-2">AÇIKLAMA</label>
                <textarea value={formData.description || ''} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50 focus:bg-white transition-colors h-28 resize-none" placeholder="Ürün detaylarını buraya yazın..."></textarea>
              </div>

              <button type="submit" disabled={imageUploading} className="w-full bg-neutral-900 text-white font-bold tracking-widest uppercase text-sm py-4 rounded-xl mt-2 hover:bg-rose-500 transition-all shadow-lg hover:shadow-rose-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {editingProduct ? 'Değişiklikleri Kaydet' : 'Ürünü Yayınla'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}