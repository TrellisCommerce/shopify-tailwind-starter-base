module.exports = {
  prefix: 'x',
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
    },
    color: {
      black: '#151515',
    },
    colors: {
      beige: {
        DEFAULT: '#F2EEE3',
        100: '#FFFFFF',
        200: '#F2EEE3',
        300: '#E0D7BD',
        400: '#CEBF96',
        500: '#BDA870',
        600: '#A78F4E',
        700: '#816E3C',
        800: '#5A4E2A',
        900: '#342D18',
        950: '#211C0F',
      },
    }
  },
  plugins: [],
};
