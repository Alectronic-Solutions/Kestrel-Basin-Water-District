import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        district: {
          primary: 'var(--kbwd-primary)',
          interactive: 'var(--kbwd-interactive)',
          slate: 'var(--kbwd-slate)',
          accent: 'var(--kbwd-accent)',
          surface: 'var(--kbwd-surface)',
          alert: 'var(--kbwd-alert)',
          caution: 'var(--kbwd-caution)',
          success: 'var(--kbwd-success)',
        },
      },
      fontFamily: { sans: ['Arial', 'Helvetica', 'sans-serif'] },
    },
  },
  plugins: [],
};

export default config;
