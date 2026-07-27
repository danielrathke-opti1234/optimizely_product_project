/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06110d',
        panel: '#0b1713',
        panel2: '#10211b',
        line: 'rgba(255,255,255,0.11)',
        mint: '#ABFF44',
        coral: '#91DBDA',
        gold: '#7DDD3D',
        sky: '#FF99B6',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,.08), 0 24px 80px rgba(0,0,0,.45), 0 0 36px rgba(171,255,68,.08)',
        soft: '0 18px 55px rgba(0,0,0,.35)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
