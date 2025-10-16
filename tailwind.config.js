/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'blue-custom-1': '#1A88C8',
        'blue-custom-2': '#187DB7',
        'blue-custom-3': '#006EAD',
        'custom-lime': '#91BC4D',
        'chart-1': '#91BC4D',
        'chart-2': '#2E6CA8',
      },
    },
  },
  plugins: [],
}

