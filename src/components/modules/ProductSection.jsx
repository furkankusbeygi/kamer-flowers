"use client";
import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function ProductSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  // Mutfaktan (MongoDB) ürünleri çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        // Sadece durumu "Aktif" olan ve stokta olan ürünleri vitrine koy
        setProducts(data.filter(p => p.status === 'Aktif' && p.stock > 0));
        setLoading(false);
      } catch (error) {
        console.error("Ürünler çekilemedi:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      
      {/* SOL MENÜ (Filtreler) */}
      <aside className="md:col-span-1 flex flex-col gap-10">
        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] text-neutral-400 mb-6 uppercase">Kategoriler</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-neutral-600">
            <li className="text-rose-500 cursor-pointer">Tüm Koleksiyon</li>
            <li className="hover:text-rose-500 transition-colors cursor-pointer">Işıklı Buketler</li>
            <li className="hover:text-rose-500 transition-colors cursor-pointer">Zambak Serisi</li>
            <li className="hover:text-rose-500 transition-colors cursor-pointer">Lale Bahçesi</li>
            <li className="hover:text-rose-500 transition-colors cursor-pointer">Gül Aranjmanları</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] text-neutral-400 mb-6 uppercase">Renk Paleti</h4>
          <div className="flex gap-3">
            <button className="w-6 h-6 rounded-full bg-rose-100 ring-2 ring-offset-2 ring-rose-200"></button>
            <button className="w-6 h-6 rounded-full bg-purple-100 hover:scale-110 transition-transform"></button>
            <button className="w-6 h-6 rounded-full bg-white border border-neutral-200 hover:scale-110 transition-transform"></button>
            <button className="w-6 h-6 rounded-full bg-indigo-900 hover:scale-110 transition-transform"></button>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold tracking-[0.2em] text-neutral-400 mb-6 uppercase">Fiyat</h4>
          <div className="h-1 w-full bg-neutral-200 rounded-full relative">
            <div className="absolute left-0 top-0 h-full w-1/2 bg-rose-500 rounded-full"></div>
            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-4 h-4 bg-rose-500 rounded-full border-2 border-white shadow-sm"></div>
          </div>
          <div className="flex justify-between text-[10px] font-bold text-neutral-400 mt-3 uppercase tracking-widest">
            <span>500 TL</span>
            <span>5000 TL</span>
          </div>
        </div>
      </aside>

      {/* SAĞ TARAF: ÜRÜN VİTRİNİ */}
      <div className="md:col-span-3">
        <div className="flex justify-between items-center mb-8">
          <span className="text-sm font-medium text-neutral-400">
            {loading ? "Yükleniyor..." : `${products.length} Özel Tasarım Listeleniyor`}
          </span>
          <select className="bg-transparent text-sm font-medium text-neutral-600 outline-none cursor-pointer">
            <option>SIRALAMA</option>
            <option>En Yeniler</option>
            <option>Fiyat: Artan</option>
            <option>Fiyat: Azalan</option>
          </select>
        </div>

        {/* Ürün Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full flex justify-center py-20 text-rose-500">
              <Loader2 className="animate-spin" size={40} />
            </div>
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <p className="text-neutral-500 font-medium text-lg">Şu an satışta ürün bulunmuyor.</p>
            </div>
          ) : (
            products.map((product) => (
              <div key={product._id} className="group relative flex flex-col gap-4">
                
                {/* Ürün Görseli Kutusu */}
                <div className="relative aspect-[3/4] bg-neutral-100 rounded-[2rem] overflow-hidden flex items-center justify-center">
                  
                  {/* GERÇEK FOTOĞRAF MANTIĞI BURADA */}
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="absolute inset-0 bg-rose-50 flex items-center justify-center p-6 text-center">
                       <span className="font-serif italic text-2xl text-rose-300 opacity-50">{product.name}</span>
                    </div>
                  )}

                  {/* Rozet */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-rose-500 uppercase z-10 shadow-sm">
                    Yeni Koleksiyon
                  </div>
                  
                  {/* Hover Butonu */}
                  <button 
  onClick={() => addToCart(product)} 
  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-neutral-900 font-bold text-xs px-6 py-4 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl hover:bg-neutral-900 hover:text-white w-[85%] uppercase tracking-widest z-10"
>
  SEPETE EKLE +
</button>
    </div>
                {/* Ürün Yazıları */}
                <div className="text-center mt-2">
                  <h3 className="font-bold text-neutral-800 text-sm tracking-wide uppercase">{product.name}</h3>
                  <p className="text-rose-500 font-bold mt-2">₺{product.price}</p>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
      
    </div>
  );
}