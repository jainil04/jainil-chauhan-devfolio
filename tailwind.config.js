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
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        pacifico: ['"Pacifico"', 'cursive'],
        oswald: ['"Oswald"', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        firacode: ['"Fira Code"', 'monospace'],
      },
      fontSize: {
        'fluid-xl': 'clamp(1.5rem, 8vw, 8rem)',
        "text-50": "50rem",
        "line-50": "calc(50 / 1)",
      },
    },
  },
  plugins: [],
};
