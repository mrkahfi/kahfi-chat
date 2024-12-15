/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable dark mode
  theme: {
    extend: {
      transitionProperty: {
        all: 'all',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        300: '300ms',
      },
      colors: {
        light: {
          background: '#F9FAFC',
          text: '#1F2937',
          primary: '#3B82F6',
          secondary: '#6B7280',
          accent: '#60A5FA',
          border: '#E5E7EB',
        },
        dark: {
          background: '#1F2937',
          text: '#F9FAFB',
          primary: '#60A5FA',
          secondary: '#9CA3AF',
          accent: '#3B82F6',
          border: '#4B5563',
        },
      },
    },
  },
  plugins: [],
};
