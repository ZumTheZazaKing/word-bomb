/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'blink': 'blink 1s linear infinite',
        'shake': 'shake .2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '1' },
        },
        shake: {
          '0%, 100%': { translate: '0' },
          '25%': { translate: '-20px' },
          '50%': { translate: '20px' },
          '75%': { translate: '-20px' },
        }
      }
    },
  },
  plugins: [],
}

