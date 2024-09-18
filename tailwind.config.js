const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      fontFamily: {
        league: ['League Spartan', 'sans serif'],
      },
    },
  },
  daisyui: {
    themes: [
      'light',
      'dark',
      'winter',
      {
        svb: {
          primary: '#0A5F71',
          secondary: '#387382',
          accent: '#387382',
          neutral: '#3d4451',
          'base-100': '#fefeff',
        },
      },
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
