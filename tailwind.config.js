/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  safelist: [
    // Tech color classes to prevent purging
    'bg-blue-50', 'text-blue-700', 'border-blue-200', 'dark:bg-blue-950/80', 'dark:text-blue-300', 'dark:border-blue-800',
    'bg-amber-100', 'text-amber-900', 'border-amber-200', 'dark:bg-amber-950/70', 'dark:text-amber-200', 'dark:border-amber-800',
    'bg-emerald-100', 'text-emerald-900', 'border-emerald-200', 'dark:bg-emerald-950/70', 'dark:text-emerald-200', 'dark:border-emerald-800',
    'bg-orange-100', 'text-orange-900', 'border-orange-200', 'dark:bg-orange-950/70', 'dark:text-orange-200', 'dark:border-orange-800',
    'bg-violet-100', 'text-violet-900', 'border-violet-200', 'dark:bg-violet-950/70', 'dark:text-violet-200', 'dark:border-violet-800',
    'bg-indigo-100', 'text-indigo-900', 'border-indigo-200', 'dark:bg-indigo-950/70', 'dark:text-indigo-200', 'dark:border-indigo-800',
    'bg-cyan-100', 'text-cyan-900', 'border-cyan-200', 'dark:bg-cyan-950/70', 'dark:text-cyan-200', 'dark:border-cyan-800',
    'bg-gray-100', 'text-gray-900', 'border-gray-300', 'dark:bg-gray-900/70', 'dark:text-gray-100', 'dark:border-gray-600',
    'bg-sky-100', 'text-sky-900', 'border-sky-200', 'dark:bg-sky-950/70', 'dark:text-sky-200', 'dark:border-sky-800',
    'bg-purple-100', 'text-purple-900', 'border-purple-200', 'dark:bg-purple-950/70', 'dark:text-purple-200', 'dark:border-purple-800',
    'bg-black/10', 'text-black', 'border-gray-300', 'dark:bg-white/10', 'dark:text-white', 'dark:border-gray-600',
    'bg-pink-100', 'text-pink-900', 'border-pink-200', 'dark:bg-pink-950/70', 'dark:text-pink-200', 'dark:border-pink-800',
    'bg-stone-100', 'text-stone-900', 'border-stone-200', 'dark:bg-stone-800/70', 'dark:text-stone-200', 'dark:border-stone-700',
    'bg-lime-100', 'text-lime-900', 'border-lime-200', 'dark:bg-lime-950/70', 'dark:text-lime-200', 'dark:border-lime-800',
    'bg-red-100', 'text-red-900', 'border-red-200', 'dark:bg-red-950/70', 'dark:text-red-200', 'dark:border-red-800',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'hsl(var(--foreground))',
            '[data-theme="dark"] &': {
              color: 'hsl(var(--foreground))',
            },
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
