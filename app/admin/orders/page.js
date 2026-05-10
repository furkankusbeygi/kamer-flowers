"use client";
import React, { useState } from 'react';
import { Search, Eye, X, Truck, CheckCircle, Package, Clock } from 'lucide-react';

// Sahte Sipariş Verileri
const initialOrders = [
  {
    id: "KMR-2026",
    customer: "Ahmet Yılmaz",
    email: "ahmet@example.com",
    date: "09 Mayıs 2026 - 14:30",
    total: "1250",
    status: "Hazırlanıyor",
    address: "Buca, İzmir",
    items: [
      { name: "Işıklı Zambak Serisi", quantity: 1, price: "1250" }
    ]
  },
  {
    id: "KMR-2025",
    customer: "Zeynep Kaya",
    email: "zeynep@example.com",
    date: "08 Mayıs 2026 - 09:15",
    total: "1700",
    status: "Kargolandı",
    address: "Kadıköy, İstanbul",
    items: [
      { name: "Gül Kurusu Buket", quantity: 2, price: "850" }
    ]
  },
  {
    id: "KMR-2024",
    customer: "Caner Şahin",
    email: "caner@example.com",
    date: "05 Mayıs 2026 - 16:45",
    total: "850",
    status: "Teslim Edildi",
    address: "Karşıyaka, İzmir",
    items: [
      { name: "Gül Kurusu Buket", quantity: 1, price: "850" }
    ]
  }
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sipariş Detayını Aç
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Duruma göre renk veren yardımcı fonksiyon
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Hazırlanıyor':
        return <span className="bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 w-max"><Clock size={14} /> Hazırlanıyor</span>;
      case 'Kargolandı':
        return <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 w-max"><Truck size={14} /> Kargolandı</span>;
      case 'Teslim Edildi':
        return <span className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 w-max"><CheckCircle size={14} /> Teslim Edildi</span>;
      default:
        return <span className="bg-neutral-100 text-neutral-700 px-3 py-1.5 rounded-full text-xs font-bold w-max">{status}</span>;
    }
  };

  // Sipariş Durumunu Güncelle (Demo)
  const updateOrderStatus = (newStatus) => {
    setOrders(orders.map(o => o.id === selectedOrder.id ? { ...o, status: newStatus } : o));
    setSelectedOrder({ ...selectedOrder, status: newStatus });
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      
      {/* Üst Kısım */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-800">Siparişler</h1>
        <p className="text-neutral-500 mt-1">Gelen siparişleri takip edin ve kargo süreçlerini yönetin.</p>
      </div>

      {/* Arama */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-neutral-100 mb-6 flex items-center gap-3">
        <Search className="text-neutral-400" size={20} />
        <input type="text" placeholder="Sipariş no veya müşteri ara..." className="w-full outline-none text-neutral-600 bg-transparent" />
      </div>

      {/* Sipariş Tablosu */}
      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 text-sm">
            <tr>
              <th className="p-5 font-medium">Sipariş No</th>
              <th className="p-5 font-medium">Müşteri</th>
              <th className="p-5 font-medium">Tarih</th>
              <th className="p-5 font-medium">Tutar</th>
              <th className="p-5 font-medium">Durum</th>
              <th className="p-5 font-medium text-right">Detay</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors">
                <td className="p-5 font-bold text-neutral-800">{order.id}</td>
                <td className="p-5 text-neutral-600">{order.customer}</td>
                <td className="p-5 text-neutral-500 text-sm">{order.date}</td>
                <td className="p-5 font-bold text-neutral-800">₺{order.total}</td>
                <td className="p-5">{getStatusBadge(order.status)}</td>
                <td className="p-5 flex justify-end">
                  <button onClick={() => viewOrderDetails(order)} className="p-2.5 text-neutral-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors font-medium flex items-center gap-2">
                    <Eye size={18}/> İncele
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- SİPARİŞ DETAY MODALI --- */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-neutral-900/60 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl relative shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-neutral-50 p-6 border-b border-neutral-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-neutral-800">Sipariş Detayı</h2>
                <p className="text-neutral-500 text-sm mt-1">{selectedOrder.id} numaralı sipariş</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-rose-500 bg-white p-2 rounded-full shadow-sm transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-8">
                {/* Müşteri Bilgisi */}
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                  <h3 className="text-xs font-bold text-neutral-400 tracking-wider mb-3">MÜŞTERİ BİLGİLERİ</h3>
                  <p className="font-bold text-neutral-800">{selectedOrder.customer}</p>
                  <p className="text-neutral-600 text-sm mt-1">{selectedOrder.email}</p>
                  <p className="text-neutral-600 text-sm mt-1">{selectedOrder.address}</p>
                </div>
                
                {/* Sipariş Durumu Güncelleme */}
                <div className="bg-neutral-50 p-4 rounded-2xl border border-neutral-100 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-neutral-400 tracking-wider mb-3">SİPARİŞ DURUMU</h3>
                    <div className="mb-3">{getStatusBadge(selectedOrder.status)}</div>
                  </div>
                  <div className="flex gap-2 mt-auto">
                     {/* Aksiyon Butonları */}
                     {selectedOrder.status !== 'Kargolandı' && selectedOrder.status !== 'Teslim Edildi' && (
                       <button onClick={() => updateOrderStatus('Kargolandı')} className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors">Kargoya Ver</button>
                     )}
                     {selectedOrder.status === 'Kargolandı' && (
                       <button onClick={() => updateOrderStatus('Teslim Edildi')} className="flex-1 bg-emerald-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-emerald-700 transition-colors">Teslim Edildi Yap</button>
                     )}
                  </div>
                </div>
              </div>

              {/* Satın Alınan Ürünler */}
              <h3 className="text-xs font-bold text-neutral-400 tracking-wider mb-3">SİPARİŞ İÇERİĞİ</h3>
              <div className="border border-neutral-100 rounded-2xl overflow-hidden">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-4 border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="bg-rose-50 p-2 rounded-lg text-rose-500">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-neutral-800">{item.name}</p>
                        <p className="text-neutral-500 text-sm">{item.quantity} Adet</p>
                      </div>
                    </div>
                    <p className="font-bold text-neutral-800">₺{item.price}</p>
                  </div>
                ))}
                
                <div className="bg-neutral-50 p-4 flex justify-between items-center border-t border-neutral-200">
                  <span className="font-bold text-neutral-600">Toplam Tutar:</span>
                  <span className="text-xl font-bold text-rose-600">₺{selectedOrder.total}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}