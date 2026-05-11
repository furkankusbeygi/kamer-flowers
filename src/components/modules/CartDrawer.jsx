"use client";
import React from 'react';
import { X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
  // Canlı sepet verilerini çekiyoruz
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Toplam fiyatı hesapla
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[100] transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#FFF9F9] z-[101] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-8 border-b border-rose-100 bg-white">
          <div className="flex flex-col">
             <span className="text-[10px] font-bold text-rose-400 tracking-[0.3em] uppercase mb-1">Kamer Flowers</span>
             <h2 className="text-3xl font-serif italic text-neutral-800">Alışveriş Çantası</h2>
          </div>
          <button onClick={onClose} className="p-3 bg-neutral-50 hover:bg-rose-50 rounded-full transition-colors text-neutral-500 hover:text-rose-500 shadow-sm">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-neutral-400">
               <p className="font-medium">Sepetiniz şu an boş.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-5 group">
                <div className="w-24 h-32 rounded-2xl overflow-hidden bg-neutral-100 flex-shrink-0 shadow-inner flex items-center justify-center relative">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <span className="text-xs text-rose-300 font-serif italic">Görsel Yok</span>
                  )}
                </div>
                
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                          <h3 className="text-sm font-bold text-neutral-800 tracking-tight">{item.name}</h3>
                          <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-1">Özel Tasarım</p>
                      </div>
                      <button onClick={() => removeFromCart(item._id)} className="text-neutral-300 hover:text-rose-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3 bg-white border border-rose-100 rounded-full px-3 py-1 shadow-sm">
                      <button onClick={() => updateQuantity(item._id, -1)} className="text-neutral-400 hover:text-rose-500 transition-colors"><Minus size={14} /></button>
                      <span className="text-xs font-bold w-4 text-center text-neutral-700">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, 1)} className="text-neutral-400 hover:text-rose-500 transition-colors"><Plus size={14} /></button>
                    </div>
                    <span className="text-sm font-black text-neutral-900">{(item.price * item.quantity).toLocaleString('tr-TR')} TL</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-8 bg-white border-t border-rose-50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Ara Toplam</span>
            <span className="text-2xl font-serif italic text-neutral-900">{total.toLocaleString('tr-TR')} TL</span>
          </div>
          <p className="text-[10px] text-neutral-400 mb-6 font-medium">Kargo ve vergiler ödeme adımında hesaplanacaktır.</p>
          
          <button 
            disabled={cartItems.length === 0} 
            className="w-full bg-neutral-900 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-rose-600 transition-all duration-300 shadow-xl hover:shadow-rose-200 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            GÜVENLİ ÖDEME <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </>
  );
}