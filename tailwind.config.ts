import type { Config } from 'tailwindcss';

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sidebar: 'var(--bg-sidebar)', 
        header: 'var(--bg-header)',   
        main: 'var(--bg-main)',      
        footer: 'var(--bg-footer)',   
        color: 'var(--color-text)',   
      },
    },
  },
  plugins: [],
} satisfies Config;
