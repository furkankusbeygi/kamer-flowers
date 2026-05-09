/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Eğer src kullanmıyorsan direkt root'taki app için
  ],
  theme: {
    extend: {
      colors: {
        'kamer': {
          'soft': '#fce4ec',   // Arka plan toz pembesi
          'medium': '#f8bbd0', // Kenarlıklar ve hafif vurgular
          'accent': '#f06292', // Ana buton ve ikon rengi
          'dark': '#d81b60',   // Hover ve önemli başlıklar
          'text': '#4a4a4a',   // Kurumsal gri-siyah metin
        },
      },
      letterSpacing: {
        'luxury': '0.4em', // Marka ismi için geniş aralık
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(240, 98, 146, 0.2)', // Pembe tonlu hafif gölge
      }
    },
  },
  plugins: [],
}