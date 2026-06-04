/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#05080f',
          900: '#080d1a',
          850: '#0a1020',
          800: '#0d1526',
          750: '#101a2e',
          700: '#142036',
          600: '#1a2a48',
          500: '#22385e',
          400: '#2d4a7a',
          300: '#3d5f96',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
        },
        accent: {
          orange: '#f97316',
          gold: '#f59e0b',
          amber: '#fbbf24',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'navy-gradient': 'linear-gradient(135deg, #05080f 0%, #0d1526 50%, #080d1a 100%)',
        'gold-gradient': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(13,21,38,0.9) 0%, rgba(8,13,26,0.95) 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(245, 158, 11, 0.15)',
        'gold-lg': '0 0 40px rgba(245, 158, 11, 0.2)',
        'navy': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'navy-lg': '0 8px 48px rgba(0, 0, 0, 0.6)',
        'glow': '0 0 30px rgba(249, 115, 22, 0.2)',
      },
      animation: {
        'pulse-gold': 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
}
