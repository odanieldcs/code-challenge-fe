/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        stoneGray: {
          100: '#f2f3f5',
          200: '#eff4fc',
          300: '#dde4f1',
          400: '#d5d9e1',
          500: '#d3dbe9',
          600: '#dfd9d3',
          700: '#94a1b7',
          800: '#23243d',
        },
      },
      minHeight: {
        '15': '60px',
      },
    },
  },
  plugins: [],
};
