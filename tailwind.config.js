/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      colors: {
        prime: '#001F3F',
        'prime-h': '#004b6f',
        'prime-lh': '#007b8a',
        slider: "#e0f7fa",
        white: '#FFFFFF',
        sand: '#C2B280',
        coral: '#FF7F50',
        span: '#36454F',
        lightBlue: '#17718F',
        lightGray: '#F0F0F0',
        darkGray: '#333333',
      },
      fontFamily: {
        'Beiruti': ["Beiruti", 'sans-serif'],
        'Alex': ["Alexandria", 'sans-serif'],
      }
      /* 
    
        lightBlue: '#ADD8E6',
        slateGray: '#708090',
      },
      colors: {
        beige: '#F5F5DC',
        olive: '#556B2F',
        whiteSmoke: '#F5F5F5',
        darkBrown: '#654321',
      },
       */
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}

