/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",

  theme: {
    extend: {
    },
  },
  plugins: [],
};


// blue: {
//   lightest: '#DCF2F1',
//   lighter: '#7FC7D9',
//   DEFAULT: '#365486', 
//   dark: '#0F1035',
// },
// green: {
//   lightest: '#F3FF90',
//   lighter: '#9BEC00',
//   DEFAULT: '#06D001',
//   dark: '#059212',
// },
// dark: { // Renamed from 'black'
//   lightest: '#DBD8E3',
//   lighter: '#5C5470',
//   DEFAULT: '#352F44',
//   dark: '#2A2438',
// }