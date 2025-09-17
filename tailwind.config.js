/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        healux: {
          primary: '#4ECDC4',
          secondary: '#45B7B8',
          dark: '#2C3E50',
          light: '#E8F8F5',
          accent: '#26D0CE',
        }
      }
    },
  },
  plugins: [],
};
