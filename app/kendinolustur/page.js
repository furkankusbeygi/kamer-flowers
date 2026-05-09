"use client";

import React, { useState, useEffect } from 'react';
import Header from '../../src/components/layout/Header';
import { Plus, Minus, Trash2, ShoppingBag, Sparkles, CheckCircle2, Award, PenTool, MessageSquareHeart, Play, Bell } from 'lucide-react';
import confetti from 'canvas-confetti';

const FLOWERS = [
  { id: 'zambak', name: 'Işıklı Zambak', price: 150, desc: "Büyük ve gösterişli" },
  { id: 'lale', name: 'Zarif Lale', price: 120, desc: "Klasik ve şık" },
  { id: 'gul', name: 'Klasik Gül', price: 180, desc: "Aşkın simgesi" },
  { id: 'papatya', name: 'Kır Papatyası', price: 90, desc: "Saf ve doğal" },
];

const COLORS = [
  { id: 'pudra', name: 'Pudra Pembe', hex: '#fce4ec', text: '#d81b60' },
  { id: 'lila', name: 'Lila', hex: '#f3e5f5', text: '#8e24aa' },
  { id: 'inci', name: 'İnci Beyazı', hex: '#ffffff', text: '#9e9e9e' },
  { id: 'mor', name: 'Gece Moru', hex: '#4a148c', text: '#ffffff' },
  { id: 'gok', name: 'Gök Mavisi', hex: '#e3f2fd', text: '#1e88e5' },
];

// GERİ GELDİ: CROSS SELLING ÜRÜNLERİ
const SUGGESTED_PRODUCTS = [
  { id: 's1', name: 'Işıklı Şönil Zambak', price: 1450, img: '/image_63af82.jpg' },
  { id: 's2', name: 'Toz Pembe Rüyası', price: 1200, img: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 's3', name: 'İnci Parıltısı', price: 1850, img: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 's4', name: 'Gece Moru Lale', price: 950, img: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
  { id: 's5', name: 'Minimalist Bahar', price: 850, img: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80' },
];

const INSPIRATION_NOTES = [
  "Seni ne kadar çok sevdiğimi kelimeler anlatamaz, ama belki bu çiçekler fısıldayabilir...",
  "Gözlerinin içine baktığım ilk günkü gibi, sonsuza dek...",
  "Seninle geçen her saniye, ömrüme eklenen bir bahar gibi.",
  "Mesafeler sadece sayıdan ibarettir, kalbim her saniye seninle atıyor."
];

const FOMO_MESSAGES = [
  "Şu an İzmir atölyemizde Merve Hanım'ın 50'li aranjmanı hazırlanıyor 🌸",
  "Az önce Karşıyaka'ya bir Işıklı Zambak serisi yola çıktı 🛵",
  "Günün 14. Özel Tasarım buketi sipariş edildi ✨",
  "Elif Hanım, sevgilisine sürpriz yapmak için Özel Buket oluşturdu 💖"
];

export default function CustomBuilderPage() {
  const [selectedFlower, setSelectedFlower] = useState(FLOWERS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [quantity, setQuantity] = useState(1);
  const [bundle, setBundle] = useState([]);
  const [isAddedToBundle, setIsAddedToBundle] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [certificateNo, setCertificateNo] = useState('');

  const [noteEnabled, setNoteEnabled] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [fomoMessage, setFomoMessage] = useState('');
  const [showFomo, setShowFomo] = useState(false);

  useEffect(() => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    setCertificateNo(`KF-2026-${randomNum}`);

    const fomoInterval = setInterval(() => {
      const randomMsg = FOMO_MESSAGES[Math.floor(Math.random() * FOMO_MESSAGES.length)];
      setFomoMessage(randomMsg);
      setShowFomo(true);
      setTimeout(() => setShowFomo(false), 5000);
    }, 15000);

    return () => clearInterval(fomoInterval);
  }, []);

  const handleAddToBundle = () => {
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 }, colors: ['#fce4ec', '#f8bbd0', '#f48fb1', '#ffffff'], gravity: 0.8, ticks: 150, disableForReducedMotion: true });
    const newItem = { id: Math.random().toString(36).substr(2, 9), flower: selectedFlower, color: selectedColor, qty: quantity, total: selectedFlower.price * quantity };
    setBundle([...bundle, newItem]);
    setIsAddedToBundle(true);
    setTimeout(() => setIsAddedToBundle(false), 1500);
    setQuantity(1); 
  };

  const handleRemoveFromBundle = (id) => setBundle(bundle.filter(item => item.id !== id));

  const handleInspireMe = () => {
    const randomNote = INSPIRATION_NOTES[Math.floor(Math.random() * INSPIRATION_NOTES.length)];
    setNoteText(randomNote);
  };

  const bundleTotal = bundle.reduce((acc, item) => acc + item.total, 0);
  const finalTotal = bundleTotal + (noteEnabled ? 100 : 0);

  const handleAddToCart = () => {
    if (bundle.length === 0) return;
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 }, colors: ['#fce4ec', '#f8bbd0', '#f48fb1', '#ffffff', '#e1bee7', '#f59e0b'], disableForReducedMotion: true });

    const finalProduct = {
      name: "Özel Tasarım Buket",
      totalPrice: finalTotal,
      certificateNumber: certificateNo,
      items: bundle.map(b => `${b.qty} Adet ${b.color.name} ${b.flower.name}`),
      secretNote: noteEnabled ? noteText : null, 
      notes: noteEnabled ? "Kaligrafi yazılı, mühürlü not eklenecek." : "Özel Oluşturulmuş Ürün"
    };

    console.log("Admin Paneline Düşecek Sipariş:", finalProduct);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
    setBundle([]);
    setNoteEnabled(false);
    setNoteText('');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F9] text-[#2D2D2D] relative overflow-hidden">
      <Header />

      {/* FOMO BİLDİRİMİ */}
      <div className={`fixed bottom-6 left-6 z-50 transition-all duration-700 ease-in-out transform ${showFomo ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-rose-100 flex items-center gap-4 max-w-sm">
          <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 flex-shrink-0 animate-pulse">
            <Bell size={18} />
          </div>
          <p className="text-xs text-neutral-600 font-medium leading-relaxed">{fomoMessage}</p>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto pt-32 pb-24 px-6 lg:px-8 relative z-10">
        
        {/* Atölye Kotası */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex items-center gap-4 bg-neutral-900 px-6 py-3 rounded-full shadow-xl shadow-neutral-900/10 border border-neutral-800">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <p className="text-[10px] sm:text-xs text-neutral-300 tracking-[0.2em] uppercase font-medium">
              Haftalık El İşçiliği Kotası: <span className="text-white font-black ml-1">Son 3 Özel Tasarım</span>
            </p>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <span className="text-[10px] font-black tracking-[0.4em] text-rose-400 uppercase mb-4 block">Atölye Masası</span>
          <h1 className="text-4xl md:text-5xl font-serif italic text-neutral-800">Kendi Buketini Oluştur</h1>
          <p className="mt-4 text-neutral-500 font-medium max-w-xl mx-auto">Her bir çiçeğin rengini ve adetini seçip, sırayla "Çiçeklerim" alanına ekleyin.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* SOL: ÇİÇEK SEÇİM ALANI */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-neutral-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-rose-400"></div>
              <h2 className="text-xl font-bold text-neutral-800 uppercase tracking-widest mb-8">Yeni Çiçek Ekle</h2>

              <div className="space-y-10">
                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 block">1. Çiçeği Seçin</label>
                  <div className="grid grid-cols-2 gap-4">
                    {FLOWERS.map((flower) => (
                      <div key={flower.id} onClick={() => setSelectedFlower(flower)} className={`cursor-pointer p-5 rounded-2xl border-2 transition-all ${selectedFlower.id === flower.id ? 'border-rose-400 bg-rose-50' : 'border-neutral-100 bg-white hover:border-rose-200'}`}>
                        <p className="font-bold text-sm text-neutral-800">{flower.name}</p>
                        <p className="text-xs font-black text-rose-500 mt-3">{flower.price} TL</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 block">2. Bu Çiçeğin Rengi</label>
                  <div className="flex flex-wrap gap-4">
                    {COLORS.map((color) => (
                      <div key={color.id} onClick={() => setSelectedColor(color)} className={`cursor-pointer group flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-all ${selectedColor.id === color.id ? 'border-rose-400 bg-white shadow-sm' : 'border-neutral-100 bg-white hover:border-rose-200'}`}>
                        <div className="w-6 h-6 rounded-full shadow-sm border border-neutral-100" style={{ backgroundColor: color.hex }}/>
                        <span className="text-xs font-bold text-neutral-700">{color.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-neutral-100">
                  <label className="text-xs font-black uppercase tracking-widest text-neutral-400 mb-4 block">3. Bu Çiçekten Kaç Adet Olsun?</label>
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center gap-6 bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-4 w-full md:w-auto justify-between">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-neutral-500 hover:text-rose-500"><Minus size={20} /></button>
                      <span className="text-xl font-black w-8 text-center text-neutral-800">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="text-neutral-500 hover:text-rose-500"><Plus size={20} /></button>
                    </div>
                    <button onClick={handleAddToBundle} className={`flex-1 w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isAddedToBundle ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-rose-100 text-rose-600 hover:bg-rose-500 hover:text-white border border-rose-200'}`}>
                      {isAddedToBundle ? <><CheckCircle2 size={18} /> Eklendi!</> : <><Plus size={18} /> Çiçeklerime Ekle</>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SAĞ: BUKET ÖZETİ VE GİZLİ NOT */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-rose-50 sticky top-32">
              <div className="flex items-center justify-between mb-8 border-b border-rose-100 pb-6">
                <div>
                  <h2 className="text-2xl font-serif italic text-neutral-800">Çiçeklerim</h2>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1">Sizin Seçimleriniz</p>
                </div>
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-rose-400">
                  <Sparkles size={20} />
                </div>
              </div>

              {bundle.length === 0 ? (
                <div className="text-center py-10 opacity-50 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                  <p className="text-sm font-medium text-neutral-500">Buketiniz şu an boş.</p>
                </div>
              ) : (
                <div className="space-y-4 mb-6 max-h-[250px] overflow-y-auto pr-2">
                  {bundle.map((item) => (
                    <div key={item.id} className="flex items-center justify-between group p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-sm border border-neutral-200" style={{ backgroundColor: item.color.hex }}>
                           <span className="text-[10px] font-black" style={{ color: item.color.text }}>{item.qty}x</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-neutral-800">{item.flower.name}</p>
                          <p className="text-[10px] uppercase tracking-widest text-neutral-500">{item.color.name}</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-neutral-900">{item.total} TL</span>
                    </div>
                  ))}
                </div>
              )}

              {/* SERTİFİKA ALANI */}
              {bundle.length > 0 && (
                <div className="mb-6 p-4 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 to-orange-50/30 flex items-center gap-4 shadow-inner">
                  <Award size={20} className="text-amber-500" />
                  <p className="text-xs text-amber-800 font-medium"><span className="font-bold">{certificateNo}</span> ile sertifikalandırılacak.</p>
                </div>
              )}

              {/* GİZLİ NOT ALANI */}
              {bundle.length > 0 && (
                <div className="mb-8 bg-neutral-50 rounded-2xl p-5 border border-neutral-100 transition-all">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setNoteEnabled(!noteEnabled)}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${noteEnabled ? 'bg-rose-500 text-white' : 'bg-white text-rose-400 border border-rose-100 shadow-sm'}`}>
                        <PenTool size={14} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-widest">Mühürlü Bir Not Ekle</h4>
                        <p className="text-[10px] text-neutral-400">Kaligrafi ile el yazısı (+100 TL)</p>
                      </div>
                    </div>
                    <div className={`w-10 h-6 rounded-full p-1 transition-colors ${noteEnabled ? 'bg-rose-500' : 'bg-neutral-200'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform ${noteEnabled ? 'translate-x-4' : 'translate-x-0'}`}></div>
                    </div>
                  </div>

                  {noteEnabled && (
                    <div className="mt-5 pt-5 border-t border-neutral-200 animate-in fade-in slide-in-from-top-4 duration-300">
                      <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Kalbinizden geçenleri buraya yazın..."
                        className="w-full h-24 bg-white border border-rose-100 rounded-xl p-4 text-xs text-neutral-700 font-medium focus:outline-none focus:ring-2 focus:ring-rose-200 resize-none shadow-inner"
                      />
                      <button onClick={handleInspireMe} className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-rose-500 hover:text-rose-600 transition-colors bg-rose-50 px-3 py-2 rounded-lg">
                        <MessageSquareHeart size={14} /> İlham Al
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* FİYAT VE SEPETE EKLE */}
              <div className="pt-6 border-t border-rose-100">
                <div className="flex justify-between items-end mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Genel Toplam</span>
                  </div>
                  <span className="text-3xl font-serif italic text-neutral-900">{finalTotal.toLocaleString('tr-TR')} TL</span>
                </div>

                <button 
                  onClick={handleAddToCart}
                  disabled={bundle.length === 0}
                  className={`w-full py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all shadow-xl flex items-center justify-center gap-3 ${isAddedToCart ? 'bg-neutral-900 text-white' : bundle.length === 0 ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed shadow-none' : 'bg-rose-500 text-white hover:bg-neutral-900 hover:shadow-rose-200'}`}
                >
                  {isAddedToCart ? 'SEPETE EKLENDİ ✓' : 'TÜM BUKETİ SEPETE EKLE'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- 4. GERİ GELEN: CROSS-SELLING (BUNLARI DA BEĞENEBİLİRSİNİZ) --- */}
        <div className="pt-16 border-t border-rose-100 mb-20">
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="text-rose-400 mb-4 tracking-[0.4em] text-[10px] font-black uppercase">Tamamlayıcı Dokunuşlar</span>
            <h3 className="text-3xl font-serif italic text-neutral-800">Bunları da Beğenebilirsiniz</h3>
            <div className="mt-6 w-16 h-[2px] bg-neutral-200"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {SUGGESTED_PRODUCTS.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-neutral-50 mb-4 shadow-sm group-hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.2)] transition-all duration-500">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <button className="w-full bg-white/95 backdrop-blur-md text-neutral-900 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg hover:bg-rose-500 hover:text-white transition-all flex items-center justify-center gap-2">
                      <ShoppingBag size={14} /> Ekle
                    </button>
                  </div>
                </div>
                <div className="text-center px-1">
                  <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-tight group-hover:text-rose-500 transition-colors line-clamp-1">{item.name}</h4>
                  <p className="text-sm font-black text-neutral-900 mt-1">{item.price.toLocaleString('tr-TR')} TL</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- 5. TIKTOK SOSYAL KANIT ALANI --- */}
        <div className="pt-20 border-t border-rose-100 mb-12">
          <div className="flex flex-col items-center mb-12 text-center">
            <span className="text-rose-400 mb-4 tracking-[0.4em] text-[10px] font-black uppercase">Atölyemizin Arka Planı</span>
            <h3 className="text-3xl md:text-4xl font-serif italic text-neutral-800">Bizi TikTok'ta İzleyin</h3>
            <p className="mt-4 text-neutral-500 text-sm font-medium">Siparişlerinizin nasıl özenle hazırlandığını milyonlarca kişiyle birlikte keşfedin.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
            {[
              { views: "1.2M", title: "Şönil Gül Yapımı 🌹", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { views: "850K", title: "Ölümsüz Buketler ✨", img: "https://images.unsplash.com/photo-1527004013197-933c4bcc61f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { views: "2.4M", title: "Sipariş Hazırlıyoruz 🎀", img: "https://images.unsplash.com/photo-1554631221-f9603e6808be?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
              { views: "500K", title: "Paketleme Günü 📦", img: "https://images.unsplash.com/photo-1542458514-60144d156cd4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
            ].map((video, idx) => (
              <div key={idx} className="relative aspect-[9/16] rounded-2xl md:rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg">
                <img src={video.img} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center pl-1 text-white border border-white/50">
                    <Play size={24} fill="currentColor" />
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-4 md:p-6 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Play size={12} fill="currentColor" className="text-white" />
                    <span className="text-[10px] font-black tracking-widest">{video.views}</span>
                  </div>
                  <p className="text-xs md:text-sm font-bold truncate">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}