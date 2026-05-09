import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart, ShoppingBag } from 'lucide-react';
import Header from '../src/components/layout/Header.jsx';
import ProductSection from '../src/components/modules/ProductSection.jsx';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF9F9] text-[#2D2D2D] selection:bg-rose-100 scroll-smooth">
      
      {/* --- ELİT HEADER --- */}
      <Header />

      <main className="max-w-[1400px] mx-auto pt-32 pb-24 px-8">
        
        {/* --- EDITORIAL HERO SECTION --- */}
        <section className="relative mb-32 group">
          <div className="grid grid-cols-12 gap-0 items-center">
            
            {/* Sol: Metin Bloğu */}
            <div className="col-span-12 lg:col-span-6 z-10 lg:pr-20">
              <div className="flex items-center gap-3 mb-6 overflow-hidden">
                <div className="h-[1px] w-12 bg-rose-300"></div>
                <span className="text-[11px] font-bold tracking-[0.5em] text-rose-400 uppercase">
                  Handcrafted Elegance
                </span>
              </div>
              
              <h2 className="text-6xl md:text-8xl font-serif leading-[1.1] mb-8 text-neutral-800 italic">
                Ölümsüz <br />
                <span className="not-italic font-black text-rose-500/90 tracking-tighter">Duygular</span>
              </h2>
              
              <p className="text-lg md:text-xl text-neutral-500 font-light leading-relaxed mb-10 max-w-md">
                Şönil çiçeklerin ipeksi dokusuyla, asla solmayacak bir aşk hikayesi inşa ediyoruz. Tamamen size özel, tamamen eşsiz.
              </p>

              {/* --- YENİ DÜZEN: BUTONLAR VE SOSYAL KANIT --- */}
              <div className="flex flex-col gap-8">
                
                {/* Buton Grubu (Mobilde alt alta, ekranda yan yana) */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/kendinolustur" 
                    className="w-full sm:w-auto justify-center bg-neutral-900 text-white px-8 py-5 rounded-full font-bold hover:bg-rose-600 transition-all duration-500 shadow-xl hover:shadow-rose-200 uppercase text-xs tracking-widest flex items-center gap-3">
                    Tasarımını Başlat <ArrowRight size={16} />
                  </Link>

                  <Link href="#koleksiyon" 
                    className="w-full sm:w-auto justify-center bg-transparent border-2 border-neutral-200 text-neutral-700 px-8 py-5 rounded-full font-bold hover:border-rose-400 hover:text-rose-500 transition-all duration-500 uppercase text-xs tracking-widest flex items-center gap-3 group">
                    Hazır Konseptler <ShoppingBag size={16} className="text-neutral-400 group-hover:text-rose-500 transition-colors" />
                  </Link>
                </div>

                {/* 500+ Mutlu Tasarım (Hemen butonların altına aldık, daha derli toplu oldu) */}
                <div className="flex items-center justify-center sm:justify-start -space-x-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="w-12 h-12 rounded-full border-4 border-[#FFF9F9] bg-neutral-200 overflow-hidden shadow-sm z-10 relative">
                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" />
                        </div>
                    ))}
                    <div className="pl-8 flex flex-col justify-center">
                        <span className="text-xs font-bold text-neutral-800">500+ Mutlu Tasarım</span>
                        <div className="flex gap-1 text-rose-400 mt-0.5">
                          <Heart size={10} fill="currentColor" /> 
                          <Heart size={10} fill="currentColor" />
                        </div>
                    </div>
                </div>

              </div>
            </div>

            {/* Sağ: Estetik Görsel */}
            <div className="col-span-12 lg:col-span-6 mt-16 lg:mt-0 relative">
              <div className="relative aspect-[4/5] md:aspect-square rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(244,63,94,0.15)] group-hover:scale-[1.02] transition-transform duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Premium Bouquet" 
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/20 to-transparent"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -left-10 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                    <Sparkles size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Atölye Seçimi</p>
                    <p className="text-sm font-bold text-neutral-800 tracking-tight">Işıklı Zambak Serisi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- VİTRİN BAŞLIĞI (Burasına ID ekledik ki buton buraya kaysın) --- */}
        <div id="koleksiyon" className="flex flex-col items-center mb-20 text-center pt-10 scroll-mt-32">
            <span className="text-rose-400 mb-4 tracking-[0.6em] text-[10px] font-black uppercase">Koleksiyon 2026</span>
            <h3 className="text-4xl font-serif italic text-neutral-800">En Çok Tercih Edilenler</h3>
            <div className="mt-6 w-20 h-[1px] bg-neutral-200"></div>
        </div>

        {/* --- YENİ FİLTRELİ ÜRÜN BÖLÜMÜ --- */}
        <ProductSection />

      </main>

      {/* --- LUXURY FOOTER --- */}
      <footer className="bg-white pt-24 pb-12 border-t border-rose-50">
        <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <h4 className="text-3xl font-black tracking-[0.4em] text-neutral-800 uppercase mb-6">Kamer Flowers</h4>
            <p className="text-neutral-400 max-w-sm font-light leading-relaxed">
                İzmir'in kalbinden, asla solmayacak el yapımı çiçeklerle hayatınıza zarafet katıyoruz. Her dikim bir hikaye anlatır.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest mb-6 text-rose-400">Keşfet</h5>
            <ul className="space-y-4 text-sm font-medium text-neutral-500">
                <li className="hover:text-rose-500 transition-colors cursor-pointer">Hikayemiz</li>
                <li className="hover:text-rose-500 transition-colors cursor-pointer">Koleksiyonlar</li>
                <li className="hover:text-rose-500 transition-colors cursor-pointer">Sıkça Sorulanlar</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest mb-6 text-rose-400">İletişim</h5>
            <p className="text-sm text-neutral-500 mb-2">Buca, İzmir</p>
            <p className="text-sm font-bold text-neutral-800 underline">info@kamerflowers.com</p>
          </div>
        </div>
        <div className="text-center text-[10px] font-bold text-neutral-300 tracking-[0.5em] uppercase">
            © 2026 DESIGNED WITH PASSION
        </div>
      </footer>
    </div>
  );
}