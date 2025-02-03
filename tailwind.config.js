/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#86d104', // Buraya istediğiniz tema rengini ekleyin
        },
      },
    },
    plugins: [],
  }