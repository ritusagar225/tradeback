/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0E14',
          card: '#141923',
          cardHover: '#1B2230',
          border: '#1E2638',
          subtle: '#2A354D',
          muted: '#64748B',
          text: '#F1F5F9',
          heading: '#FFFFFF'
        },
        brand: {
          primary: '#3B82F6',
          primaryHover: '#2563EB',
          accent: '#6366F1',
          gold: '#F59E0B'
        },
        financial: {
          profit: '#10B981',
          profitBg: 'rgba(16, 185, 129, 0.1)',
          loss: '#EF4444',
          lossBg: 'rgba(239, 68, 68, 0.1)',
          neutral: '#94A3B8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      }
    },
  },
  plugins: [],
};
