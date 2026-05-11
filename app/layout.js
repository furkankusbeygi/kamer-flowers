import "./globals.css";
import { CartProvider } from "../src/context/CartContext";
import { Toaster } from 'react-hot-toast'; // BÜYÜ is coming

export const metadata = {
  title: "Kamer Flowers | İzmir",
  description: "Ölümsüz Duygular, El Yapımı Çiçekler",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased bg-[#FFF9F9] text-[#2D2D2D]">
        <CartProvider>
          {/* Lüks bildirim ayarları */}
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              duration: 3000,
              style: {
                background: '#fff',
                color: '#2D2D2D',
                boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)',
                borderRadius: '1rem',
                border: '1px solid #FFF0F0',
                padding: '16px',
                fontWeight: 'bold',
                fontSize: '14px'
              },
            }} 
          />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}