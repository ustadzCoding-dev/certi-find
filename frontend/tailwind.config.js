/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Theme Colors
        'bg-primary': '#0F0F23',
        'bg-secondary': '#1A1A2E',
        'bg-tertiary': '#16213E',
        'accent-primary': '#7C3AED',
        'accent-secondary': '#3B82F6',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A1A1AA',
        'text-muted': '#71717A',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%)',
        'gradient-hover': 'linear-gradient(135deg, #6D28D9 0%, #2563EB 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-lg': '0 0 40px rgba(124, 58, 237, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.6)' },
        },
      },
    },
  },
  plugins: [],
}
