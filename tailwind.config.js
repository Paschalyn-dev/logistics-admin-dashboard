/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens:{
        'phone': '0px',
        // => @media (min-width: 640px) { ... }
  
        'tablet': '760px',
        // => @media (min-width: 768px) { ... }

        'after-tablet': '1024px',
  
        'laptop': '1026px',
        // => @media (min-width: 1024px) { ... }
        
        'after-laptop': '1280px',

        'before-desktop': '1536px',

        'desktop': '2560px',
        // => @media (min-width: 1280px) { ... }
  
        'bigger-desktop': '3440px',
        // => @media (min-width: 1536px) { ... }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
