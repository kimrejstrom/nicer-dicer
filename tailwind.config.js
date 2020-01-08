module.exports = {
  theme: {
    extend: {
      screens: {
        dark: { raw: '(prefers-color-scheme: dark)' },
      },
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary-dark': '#252020',
      'secondary-dark': '#393232',
    }),
    borderColor: theme => ({
      ...theme('colors'),
      'primary-dark': '#252020',
      'secondary-dark': '#393232',
    }),
  },
  variants: {
    backgroundColor: ['dark', 'dark-hover', 'dark-group-hover'],
    borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
    textColor: ['dark', 'dark-hover', 'dark-active'],
  },
  plugins: [require('tailwindcss-dark-mode')()],
};
