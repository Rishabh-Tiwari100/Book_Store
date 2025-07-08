/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'tap-upper-1': {
          '0%, 50%, 100%': { transform: 'rotate(10deg) scale(0.4)' },
          '40%': { transform: 'rotate(50deg) scale(0.4)' },
        },
        'tap-upper-2': {
          '0%, 50%, 100%': { transform: 'rotate(10deg) scale(0.6)' },
          '40%': { transform: 'rotate(50deg) scale(0.6)' },
        },
        'tap-upper-3': {
          '0%, 50%, 100%': { transform: 'rotate(10deg) scale(0.8)' },
          '40%': { transform: 'rotate(50deg) scale(0.8)' },
        },
        'tap-upper-4': {
          '0%, 50%, 100%': { transform: 'rotate(10deg) scale(1)' },
          '40%': { transform: 'rotate(50deg) scale(1)' },
        },
      },
      animation: {
        'tap-1': 'tap-upper-1 1.2s ease-in-out infinite',
        'tap-2': 'tap-upper-2 1.2s ease-in-out infinite',
        'tap-3': 'tap-upper-3 1.2s ease-in-out infinite',
        'tap-4': 'tap-upper-4 1.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
