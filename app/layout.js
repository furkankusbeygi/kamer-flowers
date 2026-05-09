import "./globals.css";

export const metadata = {
  title: "Kamer Flowers | Zarafetin Adresi",
  description: "Ölümsüz Duygular, El Yapımı Çiçekler",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col antialiased bg-[#FFF9F9] text-[#2D2D2D]">
        {children}
      </body>
    </html>
  );
}