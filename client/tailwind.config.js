/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
        archivo: ["Archivo Black", 'sans-serif'],
        cinzel : ["Cinzel Decorative", "serif"],
        wallpoet:["Wallpoet", 'sans-serif']
      },
    },
  },
  plugins: [],
}

