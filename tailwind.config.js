module.exports = {
  prefix: 'twcss-',
  // safelist is added to provide all styles for design to add through the admin
  safelist: [
    {
      pattern: /.*/,
    },
  ],
  // !important is added to override core Dawn styles for design
  important: true,
  content: [
    './layout/*.liquid',
    './templates/*.liquid',
    './templates/customers/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '750px',
      lg: '990px',
      xlg: '1440px',
      x2lg: '1920px',
      pageMaxWidth: '1440px',
    },
    extend: {
      fontFamily: {
        heading: 'var(--font-heading-family)',
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
    color: {
      black: '#000000',
    },
  },
  plugins: [],
};
