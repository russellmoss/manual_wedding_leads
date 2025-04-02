/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#715100",
        background: "#D8D1AE",
        darkBrown: "#5A3E00",
        darkBrownHover: "#3D2900",
        'milea': {
          DEFAULT: '#5A3E00',
          dark: '#4A2E00',
          light: '#8B6D30',
        },
        accent: 'var(--accent-color)',
      },
      fontFamily: {
        gilda: ["Gilda Display", "serif"],
      },
    },
  },
  plugins: [],
} 