/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07090f',
        panel: '#0d111b',
        panel2: '#111827',
        line: 'rgba(255,255,255,0.11)',
        mint: '#45d3a7',
        coral: '#ff7a6b',
        gold: '#f2c94c',
        sky: '#67d4ff',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,.08), 0 24px 80px rgba(0,0,0,.45)',
        soft: '0 18px 55px rgba(0,0,0,.35)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
