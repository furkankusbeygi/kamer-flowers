import React from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      {/* Üst Kısım: Karşılama */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-800">Hoş Geldiniz, Furkan</h1>
        <p className="text-neutral-500 mt-1">Kamer Flowers mağazanızın bugünkü özeti.</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Kart 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-neutral-500 tracking-wider">TOPLAM CİRO</h3>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign size={20} />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-neutral-800">₺24,500</span>
            <p className="text-emerald-600 text-sm font-medium flex items-center gap-1 mt-2">
              <ArrowUpRight size={16} /> %12 (Geçen aya göre)
            </p>
          </div>
        </div>

        {/* Kart 2 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-neutral-500 tracking-wider">SİPARİŞLER</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <ShoppingBag size={20} />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-neutral-800">142</span>
            <p className="text-emerald-600 text-sm font-medium flex items-center gap-1 mt-2">
              <ArrowUpRight size={16} /> %8 (Geçen aya göre)
            </p>
          </div>
        </div>

        {/* Kart 3 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-neutral-500 tracking-wider">MÜŞTERİLER</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Users size={20} />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-neutral-800">89</span>
            <p className="text-emerald-600 text-sm font-medium flex items-center gap-1 mt-2">
              <ArrowUpRight size={16} /> 12 Yeni
            </p>
          </div>
        </div>

        {/* Kart 4 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold text-neutral-500 tracking-wider">DÖNÜŞÜM ORANI</h3>
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <TrendingUp size={20} />
            </div>
          </div>
          <div>
            <span className="text-3xl font-bold text-neutral-800">%4.2</span>
            <p className="text-neutral-400 text-sm font-medium mt-2">
              Sektör ortalamasının üstünde
            </p>
          </div>
        </div>
      </div>

      {/* Son Siparişler Hızlı Bakış */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
        <h2 className="text-xl font-bold text-neutral-800 mb-6">Son Siparişler (Özet)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="border-b border-neutral-100 text-neutral-400 text-sm">
              <tr>
                <th className="pb-4 font-medium">Sipariş Kodu</th>
                <th className="pb-4 font-medium">Müşteri</th>
                <th className="pb-4 font-medium">Tutar</th>
                <th className="pb-4 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-neutral-50 last:border-0">
                <td className="py-4 font-bold text-neutral-700">#KMR-2026</td>
                <td className="py-4 text-neutral-600">Ahmet Yılmaz</td>
                <td className="py-4 font-medium text-neutral-800">₺1250</td>
                <td className="py-4"><span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">Hazırlanıyor</span></td>
              </tr>
              <tr className="border-b border-neutral-50 last:border-0">
                <td className="py-4 font-bold text-neutral-700">#KMR-2025</td>
                <td className="py-4 text-neutral-600">Zeynep Kaya</td>
                <td className="py-4 font-medium text-neutral-800">₺850</td>
                <td className="py-4"><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">Kargolandı</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}