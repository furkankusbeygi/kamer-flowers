"use client";
import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Search } from 'lucide-react';

// Şimdilik Sahte Veri (İleride MongoDB/API'den gelecek)
const initialProducts = [
  { id: 1, name: "Işıklı Zambak Serisi", price: "1250", stock: 15, status: "Aktif" },
  { id: 2, name: "Gül Kurusu Buket", price: "850", stock: 0, status: "Tükendi" }
];

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Modalı Aç (Eğer product gelirse 'Düzenle' modu, gelmezse 'Yeni Ekle' modu)
  const openModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Üst Kısım: Başlık ve Buton */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-800">Ürünler</h1>
          <p className="text-neutral-500 mt-1">Koleksiyonunuzdaki tüm ürünleri buradan yönetin.</p>
        </div>
        <button 
          onClick={() => openModal()} 
          className="bg-neutral-900 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-rose-500 transition-all shadow-lg hover:shadow-rose-200 font-medium"
        >
          <Plus size={20} /> Yeni Ürün Ekle
        </button>
      </div>

      {/* Arama ve Filtre (Görsel şimdilik) */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 mb-6 flex items-center gap-3">
        <Search className="text-neutral-400" size={20} />
        <input type="text" placeholder="Ürün ara..." className="w-full outline-none text-neutral-600 bg-transparent" />
      </div>

      {/* Ürün Tablosu */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 text-sm">
            <tr>
              <th className="p-5 font-medium">Ürün Adı</th>
              <th className="p-5 font-medium">Fiyat (TL)</th>
              <th className="p-5 font-medium">Stok</th>
              <th className="p-5 font-medium">Durum</th>
              <th className="p-5 font-medium text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
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
                  <button onClick={() => openModal(product)} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                    <Edit2 size={18}/>
                  </button>
                  <button className="p-2.5 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors">
                    <Trash2 size={18}/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- EKLEME / DÜZENLEME MODALI --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-3xl w-full max-w-lg relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Kapat Butonu */}
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-rose-500 bg-neutral-100 p-2 rounded-full transition-colors">
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-serif italic font-bold mb-8 text-neutral-800">
              {editingProduct ? 'Ürünü Düzenle' : 'Yeni Ürün Oluştur'}
            </h2>
            
            <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); /* API KAYIT İŞLEMİ BURAYA GELECEK */ setIsModalOpen(false); }}>
              
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2 tracking-wide">ÜRÜN ADI</label>
                <input type="text" defaultValue={editingProduct?.name || ''} className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none transition-all bg-neutral-50 focus:bg-white" placeholder="Örn: El Yapımı Lale" required />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2 tracking-wide">FİYAT (TL)</label>
                  <input type="number" defaultValue={editingProduct?.price || ''} className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none transition-all bg-neutral-50 focus:bg-white" placeholder="0.00" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2 tracking-wide">STOK</label>
                  <input type="number" defaultValue={editingProduct?.stock || 0} className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none transition-all bg-neutral-50 focus:bg-white" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2 tracking-wide">AÇIKLAMA & DETAYLAR</label>
                <textarea className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none transition-all bg-neutral-50 focus:bg-white h-32 resize-none" placeholder="Ürün özelliklerini buraya girin..."></textarea>
              </div>

              {/* Fotoğraf Ekleme Alanı (Görsel Şimdilik) */}
              <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6 flex flex-col items-center justify-center text-neutral-400 hover:bg-neutral-50 hover:border-rose-300 transition-colors cursor-pointer">
                 <Plus size={24} className="mb-2" />
                 <span className="text-sm font-medium">Fotoğraf Yükle</span>
              </div>

              <button type="submit" className="w-full bg-neutral-900 text-white font-bold tracking-widest uppercase text-sm py-4 rounded-xl mt-2 hover:bg-rose-500 transition-all shadow-lg hover:shadow-rose-200">
                {editingProduct ? 'Değişiklikleri Kaydet' : 'Ürünü Yayınla'}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}