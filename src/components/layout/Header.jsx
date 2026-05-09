"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Menu, ShoppingBag } from 'lucide-react';
import CartDrawer from '../modules/CartDrawer';

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-rose-50 px-6 py-4 transition-all">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center relative">
          
          {/* Sol: Mobil Menü İkonu & Masaüstü Navigasyon Linkleri */}
          <div className="flex items-center gap-8">
            {/* Sadece mobilde görünen hamburger menü */}
            <Menu className="md:hidden cursor-pointer text-neutral-800 hover:text-rose-500 transition-colors" size={24} />
            
            {/* Masaüstü Navigasyon (Mobilde gizli, md ve üstü ekranlarda görünür) */}
            <nav className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-widest text-neutral-500">
              <Link href="/" className="hover:text-rose-500 transition-colors">
                Anasayfa
              </Link>
              <Link href="#" className="hover:text-rose-500 transition-colors">
                Koleksiyon
              </Link>
              <Link href="/kendinolustur" className="text-rose-500 hover:text-rose-600 transition-colors flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                Özel Tasarım
              </Link>
            </nav>
          </div>
          
          {/* Merkez: Logo (Absolute ile tam ortalandı) */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="text-2xl md:text-3xl font-black tracking-[0.3em] text-neutral-900 uppercase cursor-pointer hover:text-rose-500 transition-colors">
              Kamer <span className="font-light">Flowers</span>
            </Link>
          </div>
          
          {/* Sağ: Arama ve Sepet İkonları */}
          <div className="flex items-center gap-6 text-neutral-800">
            <Search className="cursor-pointer hover:text-rose-500 transition-colors hidden sm:block" size={20} />
            
            <div 
              className="relative cursor-pointer group p-2"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={24} className="group-hover:text-rose-500 transition-colors" />
              {/* Sepet Bildirim Balonu */}
              <span className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                3
              </span>
            </div>
          </div>

        </div>
      </header>

      {/* Sepet Bileşeni */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}