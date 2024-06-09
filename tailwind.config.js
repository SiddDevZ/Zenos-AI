/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/Pages/**/*.{html,jsx, js, tsx}',
    './src/components/**/*.{html,jsx, js, tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        'github': "rgb(39, 39, 42)"
      },
      screens: {
        'xss': '220px', 
        'xs': '480px',
        '3xl': '1920px',
      },
      fontFamily: {
        pop: ["Poppins", "sans-serif"]
      }
    },
  },
  plugins: [],
}

