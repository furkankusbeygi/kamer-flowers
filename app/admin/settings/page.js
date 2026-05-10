"use client";
import React, { useState } from 'react';
import { Store, CreditCard, Truck, Search, Bell, Save, Shield } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('genel');

  // Menü sekmeleri
  const tabs = [
    { id: 'genel', label: 'Mağaza Bilgileri', icon: <Store size={18} /> },
    { id: 'odeme', label: 'Ödeme & Finans', icon: <CreditCard size={18} /> },
    { id: 'kargo', label: 'Kargo & Teslimat', icon: <Truck size={18} /> },
    { id: 'seo', label: 'SEO & Sosyal Medya', icon: <Search size={18} /> },
    { id: 'bildirim', label: 'Bildirimler', icon: <Bell size={18} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      
      {/* Üst Kısım */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-800">Ayarlar</h1>
          <p className="text-neutral-500 mt-1">Sistem, ödeme ve mağaza tercihlerinizi buradan yönetin.</p>
        </div>
        <button className="bg-neutral-900 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-rose-500 transition-all shadow-lg hover:shadow-rose-200 font-medium">
          <Save size={20} /> Değişiklikleri Kaydet
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sol Menü (Sekmeler) */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white p-2 rounded-2xl shadow-sm border border-neutral-100 flex flex-col gap-1 sticky top-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 w-full text-left p-3.5 rounded-xl font-medium transition-all ${
                  activeTab === tab.id 
                  ? 'bg-rose-50 text-rose-600 shadow-sm' 
                  : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sağ İçerik Alanı */}
        <div className="flex-1">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-neutral-100 min-h-[500px]">
            
            {/* 1. GENEL AYARLAR */}
            {activeTab === 'genel' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-neutral-800 mb-6 border-b border-neutral-100 pb-4">Genel Mağaza Bilgileri</h2>
                <form className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">Mağaza Adı</label>
                      <input type="text" defaultValue="Kamer Flowers" className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">Yetkili Kişi</label>
                      <input type="text" defaultValue="Furkan Kuşbeygi" className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">İletişim E-Posta</label>
                      <input type="email" defaultValue="info@kamerflowers.com" className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">Müşteri Hizmetleri No</label>
                      <input type="text" defaultValue="+90 555 123 45 67" className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Merkez Adresi</label>
                    <textarea className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50 h-24 resize-none" defaultValue="Buca, İzmir"></textarea>
                  </div>
                </form>
              </div>
            )}

            {/* 2. ÖDEME AYARLARI */}
            {activeTab === 'odeme' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-neutral-800 mb-6 border-b border-neutral-100 pb-4">Ödeme ve Finans Tercihleri</h2>
                <form className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">Para Birimi</label>
                      <select className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50">
                        <option>Türk Lirası (₺)</option>
                        <option>Dolar ($)</option>
                        <option>Euro (€)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">Standart KDV Oranı (%)</label>
                      <input type="number" defaultValue="20" className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50" />
                    </div>
                  </div>
                  
                  <div className="bg-neutral-50 p-5 rounded-2xl border border-neutral-200">
                    <h3 className="font-bold text-neutral-800 mb-4 flex items-center gap-2"><Shield size={18} className="text-emerald-500"/> Sanal POS Entegrasyonu (İyzico/PayTR)</h3>
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 tracking-wider mb-1">API KEY</label>
                        <input type="password" defaultValue="************************" className="w-full border-2 border-white rounded-xl p-3 outline-none" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-neutral-500 tracking-wider mb-1">SECRET KEY</label>
                        <input type="password" defaultValue="************************" className="w-full border-2 border-white rounded-xl p-3 outline-none" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* 3. KARGO AYARLARI */}
            {activeTab === 'kargo' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-neutral-800 mb-6 border-b border-neutral-100 pb-4">Kargo ve Teslimat Kuralları</h2>
                <form className="flex flex-col gap-6">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">Sabit Kargo Ücreti (TL)</label>
                      <input type="number" defaultValue="49.90" className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">Ücretsiz Kargo Limiti (TL)</label>
                      <input type="number" defaultValue="1500" className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50" />
                      <p className="text-xs text-neutral-400 mt-2">Bu tutarın üzerindeki siparişlerde kargo bedava olur.</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-3">Çalışılan Kargo Firmaları</label>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50">
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-rose-500" />
                        <span className="font-medium text-neutral-700">Yurtiçi Kargo</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50">
                        <input type="checkbox" defaultChecked className="w-5 h-5 accent-rose-500" />
                        <span className="font-medium text-neutral-700">Aras Kargo</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border border-neutral-200 rounded-xl cursor-pointer hover:bg-neutral-50">
                        <input type="checkbox" className="w-5 h-5 accent-rose-500" />
                        <span className="font-medium text-neutral-700">MNG Kargo</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* 4. SEO AYARLARI */}
            {activeTab === 'seo' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-neutral-800 mb-6 border-b border-neutral-100 pb-4">SEO ve Sosyal Medya</h2>
                <form className="flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Site Meta Başlığı (Title)</label>
                    <input type="text" defaultValue="Kamer Flowers | El Yapımı Çiçekler" className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50" />
                    <p className="text-xs text-neutral-400 mt-2">Google'da arama sonuçlarında görünecek ana başlık.</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-neutral-700 mb-2">Site Meta Açıklaması (Description)</label>
                    <textarea className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50 h-24 resize-none" defaultValue="Ölümsüz duygularınızı Kamer Flowers'ın el yapımı, özel tasarım çiçekleriyle ifade edin."></textarea>
                  </div>
                  <div className="grid grid-cols-2 gap-5 mt-4">
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">Instagram URL</label>
                      <input type="url" defaultValue="https://instagram.com/kamerflowers" className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-neutral-700 mb-2">WhatsApp Sipariş Hattı</label>
                      <input type="text" defaultValue="+90 555 123 45 67" className="w-full border-2 border-neutral-100 rounded-xl p-3.5 focus:border-rose-400 outline-none bg-neutral-50" />
                    </div>
                  </div>
                </form>
              </div>
            )}

            {/* 5. BİLDİRİM AYARLARI */}
            {activeTab === 'bildirim' && (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <h2 className="text-xl font-bold text-neutral-800 mb-6 border-b border-neutral-100 pb-4">E-Posta & SMS Bildirimleri</h2>
                <div className="flex flex-col gap-4">
                  
                  <div className="flex items-center justify-between p-5 border border-neutral-200 rounded-2xl hover:bg-neutral-50 transition-colors">
                    <div>
                      <h3 className="font-bold text-neutral-800">Yeni Sipariş E-Postası</h3>
                      <p className="text-sm text-neutral-500">Müşteri sipariş verdiğinde anında bana e-posta gönder.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-5 border border-neutral-200 rounded-2xl hover:bg-neutral-50 transition-colors">
                    <div>
                      <h3 className="font-bold text-neutral-800">Düşük Stok Uyarısı</h3>
                      <p className="text-sm text-neutral-500">Bir ürünün stoğu 5'in altına düştüğünde uyar.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-5 border border-neutral-200 rounded-2xl hover:bg-neutral-50 transition-colors">
                    <div>
                      <h3 className="font-bold text-neutral-800">Müşteriye Kargo SMS'i</h3>
                      <p className="text-sm text-neutral-500">Sipariş kargoya verildiğinde müşteriye otomatik SMS at.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}