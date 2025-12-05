/**
 * Tailwind CSS Configuration
 * ==========================
 * 
 * This configures Tailwind CSS with:
 * - shadcn/ui color system (for admin)
 * - Ordo design system colors (for customer-facing)
 * - Custom typography scale
 * - Dark mode via class strategy
 * - can-hover: variant for touch device handling
 * 
 * To customize colors, edit the CSS variables in app/globals.css
 * To add shadcn components: npx shadcn@latest add <component>
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // shadcn/ui colors (admin)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        
        // Ordo Design System Colors (customer-facing)
        ordo: {
          // Primary Blue Scale
          primary: {
            100: 'var(--ordo-primary-100, #C9E4F9)',
            200: 'var(--ordo-primary-200, #7BB8D9)',
            300: 'var(--ordo-primary-300, #0099D6)',
            400: 'var(--ordo-primary-400, #0077B3)',
            500: 'var(--ordo-primary-500, #1A5276)',
            DEFAULT: 'var(--ordo-primary-300, #0099D6)',
          },
          // Neutrals
          neutral: {
            100: 'var(--ordo-neutral-100, #F0F0F0)',
            200: 'var(--ordo-neutral-200, #D0D0D0)',
            300: 'var(--ordo-neutral-300, #A0A0A0)',
            400: 'var(--ordo-neutral-400, #606060)',
            500: 'var(--ordo-neutral-500, #000000)',
          },
          // Pink Accent
          pink: {
            100: 'var(--ordo-pink-100, #F5E6F0)',
            200: 'var(--ordo-pink-200, #E8B4D0)',
            300: 'var(--ordo-pink-300, #D46F9B)',
            400: 'var(--ordo-pink-400, #A34470)',
            500: 'var(--ordo-pink-500, #6B2D4A)',
            DEFAULT: 'var(--ordo-pink-300, #D46F9B)',
          },
          // Yellow/Orange Accent
          yellow: {
            100: 'var(--ordo-yellow-100, #F7EED8)',
            200: 'var(--ordo-yellow-200, #F5D99A)',
            300: 'var(--ordo-yellow-300, #F5C24A)',
            400: 'var(--ordo-yellow-400, #F5A623)',
            500: 'var(--ordo-yellow-500, #8B5A2B)',
            DEFAULT: 'var(--ordo-yellow-300, #F5C24A)',
          },
          // Green Accent
          green: {
            100: 'var(--ordo-green-100, #DDF2E4)',
            200: 'var(--ordo-green-200, #8DCAA0)',
            300: 'var(--ordo-green-300, #5DB57A)',
            400: 'var(--ordo-green-400, #2E9E4E)',
            500: 'var(--ordo-green-500, #1D6B35)',
            DEFAULT: 'var(--ordo-green-300, #5DB57A)',
          },
          // Semantic
          white: 'var(--ordo-white, #FFFFFF)',
          black: 'var(--ordo-black, #000000)',
          surface: 'var(--ordo-surface, #FAFBFC)',
          divider: 'var(--ordo-divider, #D0D0D0)',
        },
      },
      
      fontFamily: {
        // Ordo fonts
        heading: ['var(--font-noto-serif)', 'Noto Serif', 'Georgia', 'serif'],
        body: ['var(--font-outfit)', 'Outfit', 'system-ui', 'sans-serif'],
      },
      
      fontSize: {
        // shadcn/ui sizes
        title: 'var(--font-title)',
        h1: 'var(--font-h1)',
        section: 'var(--font-section)',
        body: 'var(--font-body)',
        
        // Ordo responsive sizes
        'ordo-xs': 'var(--ordo-text-xs, 0.875rem)',
        'ordo-sm': 'var(--ordo-text-sm, 1rem)',
        'ordo-md': 'var(--ordo-text-md, 1rem)',
        'ordo-lg': 'var(--ordo-text-lg, 1.125rem)',
        'ordo-xl': 'var(--ordo-text-xl, 1.5625rem)',
        'ordo-2xl': 'var(--ordo-text-2xl, 1.75rem)',
        'ordo-3xl': 'var(--ordo-text-3xl, 2.25rem)',
      },
      
      spacing: {
        // Ordo spacing
        'ordo-xs': 'var(--ordo-space-xs, 0.5rem)',
        'ordo-sm': 'var(--ordo-space-sm, 0.625rem)',
        'ordo-md': 'var(--ordo-space-md, 1rem)',
        'ordo-lg': 'var(--ordo-space-lg, 1.5rem)',
        'ordo-xl': 'var(--ordo-space-xl, 2.5rem)',
        'ordo-2xl': 'var(--ordo-space-2xl, 3.5rem)',
        'ordo-3xl': 'var(--ordo-space-3xl, 4.5rem)',
      },
      
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        // Ordo radii
        'ordo-sm': 'var(--ordo-radius-sm, 0.25rem)',
        'ordo-md': 'var(--ordo-radius-md, 0.5rem)',
        'ordo-lg': 'var(--ordo-radius-lg, 1rem)',
        'ordo-xl': 'var(--ordo-radius-xl, 1.5rem)',
      },
      
      boxShadow: {
        'ordo-sm': 'var(--ordo-shadow-sm)',
        'ordo-md': 'var(--ordo-shadow-md)',
        'ordo-lg': 'var(--ordo-shadow-lg)',
        'ordo-xl': 'var(--ordo-shadow-xl)',
      },
      
      lineHeight: {
        'ordo-tight': 'var(--ordo-leading-tight, 1.1)',
        'ordo-snug': 'var(--ordo-leading-snug, 1.33)',
        'ordo-normal': 'var(--ordo-leading-normal, 1.5)',
        'ordo-relaxed': 'var(--ordo-leading-relaxed, 1.625)',
      },
      
      letterSpacing: {
        'ordo-tight': 'var(--ordo-tracking-tight, -0.02em)',
        'ordo-normal': 'var(--ordo-tracking-normal, 0.009em)',
        'ordo-wide': 'var(--ordo-tracking-wide, 0.03em)',
      },
      
      screens: {
        'mobile': '393px',
        'tablet': '768px',
        'desktop': '1280px',
        'wide': '1440px',
      },
      
      animation: {
        'ordo-fade-in': 'ordoFadeIn 0.5s ease-out forwards',
        'ordo-fade-in-up': 'ordoFadeInUp 0.5s ease-out forwards',
        'ordo-slide-in-left': 'ordoSlideInLeft 0.5s ease-out forwards',
        'ordo-slide-in-right': 'ordoSlideInRight 0.5s ease-out forwards',
      },
      
      keyframes: {
        ordoFadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        ordoFadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        ordoSlideInLeft: {
          from: { opacity: '0', transform: 'translateX(-20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        ordoSlideInRight: {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    // Only apply hover styles on devices that support hover (not touch)
    // Usage: can-hover:hover:bg-accent instead of hover:bg-accent
    function({ addVariant }) {
      addVariant('can-hover', '@media (hover: hover)')
    },
  ],
}
