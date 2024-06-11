/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'github': "rgb(39, 39, 42)",
        'blackk': "rgb(9, 9, 11)",
      },
      textColor: {
        'copi': "rgb(161, 161, 170)"
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