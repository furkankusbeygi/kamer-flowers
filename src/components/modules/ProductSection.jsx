"use client";

import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const CATEGORIES = ["Tüm Koleksiyon", "Işıklı Buketler", "Zambak Serisi", "Lale Bahçesi", "Gül Aranjmanları"];
const COLORS = [
  { name: "Pudra", hex: "#fce4ec" },
  { name: "Lila", hex: "#f3e5f5" },
  { name: "İnci Beyazı", hex: "#ffffff" },
  { name: "Gece Moru", hex: "#4a148c" }
];

// Gerçekçi ve şık örnek ürün verileri
const PRODUCTS = [
  {
    id: 1,
    name: "Işıklı Şönil Zambak Serisi",
    price: "1.450",
    oldPrice: "1.900",
    img: "/image_63af82.jpg", // Senin kendi ürün görselin
    tag: "En Çok Satan"
  },
  {
    id: 2,
    name: "Toz Pembe Rüyası",
    price: "1.200",
    oldPrice: "1.500",
    img: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Yeni Koleksiyon"
  },
  {
    id: 3,
    name: "İnci Parıltısı Aranjman",
    price: "1.850",
    oldPrice: "2.200",
    img: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Atölye Seçimi"
  },
  {
    id: 4,
    name: "Gece Moru Lale Buketi",
    price: "950",
    oldPrice: "1.250",
    img: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: null
  },
  {
    id: 5,
    name: "Pudra Aşkı Güller",
    price: "1.100",
    oldPrice: null,
    img: "https://images.unsplash.com/photo-1463320726281-696a485928c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: "Sınırlı Üretim"
  },
  {
    id: 6,
    name: "Minimalist Bahar",
    price: "850",
    oldPrice: "1.000",
    img: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    tag: null
  }
];

export default function ProductSection() {
  return (
    <section className="flex flex-col lg:flex-row gap-12">
      
      {/* --- SIDEBAR FİLTRE (LEFT) --- */}
      <aside className="w-full lg:w-64 flex-shrink-0">
        <div className="sticky top-32 space-y-10">
          
          {/* Kategori Filtresi */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6">Kategoriler</h4>
            <ul className="space-y-4">
              {CATEGORIES.map((cat, i) => (
                <li key={i} className={`text-sm font-medium cursor-pointer transition-all hover:text-rose-500 ${i === 0 ? 'text-rose-500 font-bold' : 'text-neutral-600'}`}>
                  {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Renk Paleti Filtresi */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6">Renk Paleti</h4>
            <div className="flex flex-wrap gap-3">
              {COLORS.map((color, i) => (
                <div 
                  key={i} 
                  className="w-8 h-8 rounded-full border border-neutral-100 cursor-pointer hover:scale-110 transition-transform shadow-sm"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Fiyat Aralığı */}
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-6">Fiyat</h4>
            <div className="space-y-2">
              <input type="range" className="w-full accent-rose-500" />
              <div className="flex justify-between text-[10px] font-bold text-neutral-500">
                <span>500 TL</span>
                <span>5000 TL</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- ÜRÜN GRİD (RIGHT) --- */}
      <div className="flex-1">
        {/* Üst Sıralama ve Bilgi */}
        <div className="flex justify-between items-center mb-10 pb-4 border-b border-rose-50">
          <p className="text-xs font-medium text-neutral-400">6 Özel Tasarım Listeleniyor</p>
          <div className="flex items-center gap-2 cursor-pointer group">
            <span className="text-xs font-bold uppercase tracking-widest group-hover:text-rose-500 transition-colors">Sıralama</span>
            <ChevronDown size={14} className="group-hover:text-rose-500" />
          </div>
        </div>

        {/* Kartlar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden bg-neutral-50 mb-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] group-hover:shadow-rose-100 transition-all duration-500">
                
                {/* Ürün Etiketi (Eğer varsa) */}
                {product.tag && (
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <span className="text-[9px] font-black uppercase tracking-widest text-rose-500">{product.tag}</span>
                  </div>
                )}

                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Hızlı Ekle Butonu */}
                <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <button className="w-full bg-white/95 backdrop-blur-md text-neutral-900 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-rose-500 hover:text-white transition-all">
                    Sepete Ekle +
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-center lg:text-left">
                <h4 className="text-sm font-bold text-neutral-800 uppercase tracking-tight group-hover:text-rose-500 transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <span className="text-lg font-black text-neutral-900">{product.price} TL</span>
                  {product.oldPrice && (
                    <span className="text-[10px] text-neutral-400 line-through font-medium">{product.oldPrice} TL</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}