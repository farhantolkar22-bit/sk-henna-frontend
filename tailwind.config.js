/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        henna: {
          50: '#fdf8f6',
          100: '#fbeee9',
          200: '#f7ddd4',
          300: '#f0c2b4',
          400: '#e59f8a',
          500: '#d77c62',
          600: '#c55e44',
          700: '#a54a32',
          800: '#893f2c',
          900: '#733729',
          950: '#3e1a12',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F3E5AB',
          dark: '#AA7C11',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        cursive: ['"Alex Brush"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
