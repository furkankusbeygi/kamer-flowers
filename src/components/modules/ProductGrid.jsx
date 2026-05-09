import { ShoppingCart } from 'lucide-react';

const PRODUCTS = [
  { id: 1, name: "Işıklı Şönil Zambak", price: "1.250", img: "/image_63af82.jpg" },
  { id: 2, name: "Klasik Gül Buketi", price: "950", img: "https://via.placeholder.com/400x500" },
  { id: 3, name: "Renkli Lale Bahçesi", price: "1.100", img: "https://via.placeholder.com/400x500" },
  { id: 4, name: "Özel Tasarım Aranjman", price: "1.500", img: "https://via.placeholder.com/400x500" },
];

export default function ProductGrid() {
  return (
    <section className="px-2 md:px-0">
      {/* Shopier tarzı kategori başlığı */}
      <div className="text-center my-8">
        <h2 className="text-lg font-bold text-gray-700 border-b-2 border-kamer-accent inline-block pb-1 uppercase tracking-wider">
          Tüm Ürünler
        </h2>
      </div>

      {/* Shopier Grid Yapısı: Mobilde 2, Masaüstünde 4 sütun */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="bg-white border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            {/* Ürün Görseli */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f9f9]">
              <img 
                src={p.img} 
                className="w-full h-full object-cover" 
                alt={p.name} 
              />
            </div>
            
            {/* Ürün Bilgisi */}
            <div className="p-3 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-xs md:text-sm text-gray-600 font-medium line-clamp-2 mb-1">
                  {p.name}
                </h3>
                <p className="text-sm md:text-base font-bold text-kamer-dark">
                  {p.price} TL
                </p>
              </div>
              
              <button className="mt-3 w-full bg-kamer-accent text-white py-2 rounded-sm text-xs font-bold flex items-center justify-center gap-2 hover:bg-kamer-dark transition-colors">
                <ShoppingCart size={14} /> SATIN AL
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}