/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // White theme colors
        'theme-white': {
          bg: '#ffffff',
          text: '#000000',
          border: '#e5e7eb',
          hover: '#f3f4f6',
        },
        // Black theme colors
        'theme-black': {
          bg: '#000000',
          text: '#ffffff',
          border: '#374151',
          hover: '#111827',
        },
      },
    },
  },
  plugins: [],
};