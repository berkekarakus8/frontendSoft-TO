/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // support class-based dark mode
  theme: {
    extend: {
      colors: {
        sofa: {
          blue: {
            DEFAULT: '#045cfc',
            dark: '#024db5',
            light: '#3b82f6',
            accent: '#0052cc'
          },
          dark: {
            bg: '#0c1017',         // Main app background
            surface: '#181e29',    // Panel/card background
            surfaceHover: '#232b3a',
            border: '#252f3f',     // Borders
            text: '#f8fafc',       // High emphasis text
            textMuted: '#94a3b8',  // Medium emphasis text
            active: '#1e293b'
          },
          live: '#ff3b30',          // Blinking live score red
          green: '#028a0f',         // Player rating 7.0+
          orange: '#e65c00',        // Player rating 6.0-6.9
          red: '#c00000',           // Player rating <6.0, red card
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'sofa': '0 2px 8px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}
