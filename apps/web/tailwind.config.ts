import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F1C3D',
        foreground: '#F4F0E6',
        card: '#16254A',
        border: '#2A3C6B',
        accent: {
          cyan: '#FF2C6D',
          pink: '#C92867',
          ink: '#2A1F63',
        },
      },
      boxShadow: {
        glowCyan: '0 0 24px rgba(255, 44, 109, 0.28)',
        glowPink: '0 0 22px rgba(201, 40, 103, 0.25)',
        materialSoft: '0 10px 24px rgba(0, 0, 0, 0.35)',
      },
      backgroundImage: {
        mesh:
          'radial-gradient(circle at 12% 15%, rgba(255, 44, 109, 0.2), transparent 32%), radial-gradient(circle at 78% 8%, rgba(201, 40, 103, 0.16), transparent 36%), linear-gradient(160deg, #0d1733 0%, #12234a 45%, #0d1a37 100%)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
