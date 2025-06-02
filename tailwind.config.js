/** @type {import('tailwindcss').Config} */
const { black, white, emerald, indigo, yellow, warmGray, lightBlue, trueGray, coolGray, blueGray } = require('tailwindcss/colors');

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black,
        white,
        emerald,
        indigo,
        yellow,
        stone: warmGray,
        sky: lightBlue,
        neutral: trueGray,
        gray: coolGray,
        slate: blueGray,
      }
    },
  },
  plugins: [],
};
