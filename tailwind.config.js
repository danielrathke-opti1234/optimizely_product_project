/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#061314',
        panel: '#0b1717',
        panel2: '#102020',
        line: 'rgba(255,255,255,0.11)',
        mint: '#91DBDA',
        coral: '#91DBDA',
        gold: '#7DDD3D',
        sky: '#FF99B6',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,.08), 0 24px 80px rgba(0,0,0,.45), 0 0 36px rgba(145,219,218,.1)',
        soft: '0 18px 55px rgba(0,0,0,.35)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
