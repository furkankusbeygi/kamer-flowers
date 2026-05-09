export default function Hero() {
  return (
    <div className="bg-white p-4 mb-6 border border-kamer-medium rounded-sm shadow-sm">
      <h3 className="text-sm font-bold text-kamer-dark mb-2 uppercase">✨ Özel Tasarım Oluştur</h3>
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="3 lale, 2 zambak olsun..." 
          className="flex-1 text-xs p-2 border border-gray-200 outline-none focus:border-kamer-accent"
        />
        <button className="bg-kamer-dark text-white px-4 py-2 text-xs font-bold uppercase">
          Ekle
        </button>
      </div>
    </div>
  );
}