/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#A2FF00", // Açık yeşil (Buton rengi)
        secondary: "#75A300", // Daha koyu yeşil (Hover ve vurgu için)
        background: "#1a241c", // Ana arka plan rengi
        card: "#1E1E1E", // Kart ve input arka plan rengi
        textPrimary: "#FFFFFF", // Beyaz yazılar için
        textSecondary: "#CCCCCC", // Daha soluk gri yazılar
      },
    },
  },
  plugins: [],
};
