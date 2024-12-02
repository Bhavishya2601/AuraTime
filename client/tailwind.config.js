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
    screens: {
      'xxs' : '425px',
      'xs' : '500px',
      'sm' : '640px',
      'md' : '768px',
      'lg' : '1024px',
      'xl' : '1280px',
      '2xl' : '1536px'
    }
  },
  plugins: [],
}

