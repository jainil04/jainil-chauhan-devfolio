/** @type {import('tailwindcss').Config} */
import { black as _black, white as _white, emerald as _emerald, indigo as _indigo, yellow as _yellow, warmGray, lightBlue, trueGray, coolGray, blueGray } from 'tailwindcss/colors';

export const content = [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./src/**/*.{js,ts,jsx,tsx}",
  './src/app/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}',
];
export const darkMode = 'class';
export const theme = {
  extend: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: _black,
      white: _white,
      emerald: _emerald,
      indigo: _indigo,
      yellow: _yellow,
      stone: warmGray,
      sky: lightBlue,
      neutral: trueGray,
      gray: coolGray,
      slate: blueGray,
    }
  },
};
export const plugins = [];
