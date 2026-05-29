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
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.25rem',
          lg: '2rem',
        },
        screens: {
          '2xl': '90rem',
        },
      },
      screens: {
        '3xl': '120rem',
        '4xl': '160rem',
      },
      colors: {
        background: '#050816',
        foreground: '#FFFFFF',
        card: '#0A132A',
        border: '#233056',
        brand: {
          navy: '#0A132A',
          deep: '#050816',
          white: '#FFFFFF',
          light: '#F8FAFC',
          pink: '#FF2D6F',
          rose: '#C72568',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
        accent: {
          cyan: '#FF2D6F',
          pink: '#C72568',
          ink: '#0A132A',
        },
      },
      boxShadow: {
        glowCyan: '0 12px 36px rgba(255, 45, 111, 0.28)',
        glowPink: '0 12px 32px rgba(199, 37, 104, 0.3)',
        materialSoft: '0 12px 42px rgba(2, 7, 21, 0.52)',
        panel: '0 16px 40px rgba(1, 6, 20, 0.42)',
      },
      backgroundImage: {
        mesh:
          'radial-gradient(circle at 12% 15%, rgba(255, 45, 111, 0.22), transparent 34%), radial-gradient(circle at 78% 8%, rgba(199, 37, 104, 0.2), transparent 36%), linear-gradient(160deg, #050816 0%, #0a132a 42%, #0b1734 100%)',
        premiumGrid:
          'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.5rem',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'Inter', 'system-ui', 'sans-serif'],
        secondary: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-plus-jakarta)', 'Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { opacity: '0.6', transform: 'translateX(-8%)' },
          '100%': { opacity: '1', transform: 'translateX(8%)' },
        },
      },
      animation: {
        'gradient-shift': 'gradient-shift 12s ease infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 1.8s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};

export default config;
