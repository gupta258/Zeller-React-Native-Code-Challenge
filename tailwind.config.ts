import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#6C5CE7',
        secondary: '#00B894',
        error: '#D63031',
        gray: {
          50: '#F8F9FA',
          100: '#E5E5E5',
          200: '#95A5A6',
          300: '#636E72',
          400: '#2D3436',
        },
      },
    },
  },
  plugins: [],
};

export default config;

