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
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

