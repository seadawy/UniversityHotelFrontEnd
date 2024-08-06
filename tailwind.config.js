/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      colors: {
        prime: '#1B5AA5',
        secondry: '#0069D2',
        'prime-h': '#143C84',
        'prime-lh': '#2C5F97',
        slider: "#AFDCC4",
      },
      fontFamily: {
        'Beiruti': ["Beiruti", 'sans-serif'],
        'Alex': ["Alexandria", 'sans-serif'],
      }
      /* 
              
 */
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}

