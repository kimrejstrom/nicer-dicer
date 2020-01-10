module.exports = {
  theme: {
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
  plugins: [],
};
