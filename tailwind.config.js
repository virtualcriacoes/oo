/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#193993',
          50: '#e6eaf5',
          100: '#b3c4e6',
          200: '#809ed6',
          300: '#4d78c7',
          400: '#1a52b8',
          500: '#193993',
          600: '#162f7a',
          700: '#132561',
          800: '#101b48',
          900: '#0d122f'
        },
        accent: {
          DEFAULT: '#ff8100',
          50: '#fff0e0',
          100: '#ffd1b3',
          200: '#ffb380',
          300: '#ff944d',
          400: '#ff751a',
          500: '#ff8100',
          600: '#e66a00',
          700: '#cc5c00',
          800: '#b34d00',
          900: '#993f00'
        }
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      },
      borderRadius: {
        'large': '1rem'
      }
    },
  },
  plugins: [],
}
