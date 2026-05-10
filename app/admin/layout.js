import Link from 'next/link';
import { LayoutDashboard, Package, ShoppingCart, Settings } from 'lucide-react';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-neutral-50 text-neutral-800">
      
      {/* Sol Menü (Sidebar) */}
      <aside className="w-64 bg-white border-r border-neutral-200 p-6 flex flex-col gap-8 sticky top-0 h-screen">
        <div>
          <h2 className="text-2xl font-serif italic font-bold text-neutral-800">Kamer<span className="text-rose-500">Admin</span></h2>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Yönetim Paneli</p>
        </div>

        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 text-neutral-600 hover:text-rose-600 transition-all font-medium">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 p-3 rounded-xl bg-rose-50 text-rose-600 font-bold shadow-sm transition-all">
            <Package size={20} /> Ürün Yönetimi
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 text-neutral-600 hover:text-rose-600 transition-all font-medium">
            <ShoppingCart size={20} /> Siparişler
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-rose-50 text-neutral-600 hover:text-rose-600 transition-all font-medium mt-auto">
            <Settings size={20} /> Ayarlar
          </Link>
        </nav>
      </aside>

      {/* Ana İçerik Alanı */}
      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}