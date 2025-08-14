/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        'xs': '475px',
        'mobile': {'max': '767px'},
        'tablet': {'min': '768px', 'max': '1023px'},
        'desktop': {'min': '1024px'},
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // WhatsApp brand colors
        whatsapp: {
          primary: "hsl(143, 69%, 50%)",
          secondary: "hsl(143, 69%, 45%)",
          light: "hsl(61, 100%, 96%)",
          'light-gray': "hsl(210, 17%, 98%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      minHeight: {
        'touch': '44px',
        'screen-mobile': '100vh',
        'screen-ios': '-webkit-fill-available',
      },
      maxHeight: {
        'screen-mobile': '100vh',
        'screen-ios': '-webkit-fill-available',
      },
      height: {
        'screen-mobile': '100vh',
        'screen-ios': '-webkit-fill-available',
        'dvh': '100dvh',
      },
      fontSize: {
        'mobile': ['16px', '1.5'],
        'mobile-sm': ['14px', '1.4'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-out-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "slide-out-left": "slide-out-left 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
      },
      transitionProperty: {
        'mobile': 'all',
      },
      transitionDuration: {
        'mobile': '200ms',
      },
      transitionTimingFunction: {
        'mobile': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [
    // Custom plugin for mobile utilities and animations
    function({ addUtilities, addComponents, theme }: any) {
      const mobileUtilities = {
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
        '.scroll-smooth-mobile': {
          'scroll-behavior': 'smooth',
          '-webkit-overflow-scrolling': 'touch',
        },
        '.tap-highlight-none': {
          '-webkit-tap-highlight-color': 'transparent',
        },
        '.text-rendering-optimized': {
          'text-rendering': 'optimizeLegibility',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        '.overflow-touch': {
          '-webkit-overflow-scrolling': 'touch',
        },
        '.animate-accordion-down': {
          animation: 'accordion-down 0.2s ease-out',
        },
        '.animate-accordion-up': {
          animation: 'accordion-up 0.2s ease-out',
        },
        '.animate-slide-in-left': {
          animation: 'slide-in-left 0.3s ease-out',
        },
        '.animate-slide-out-left': {
          animation: 'slide-out-left 0.3s ease-out',
        },
        '.animate-fade-in': {
          animation: 'fade-in 0.2s ease-out',
        },
        '.animate-fade-out': {
          animation: 'fade-out 0.2s ease-out',
        },
      }
      
      addUtilities(mobileUtilities, ['responsive']);
    }
  ],
}