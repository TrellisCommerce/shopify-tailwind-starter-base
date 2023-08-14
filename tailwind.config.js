const plugin = require('tailwindcss/plugin');

const gridSystem = ({ addComponents }) =>
  addComponents({
    '.grid-system': {
      marginLeft: '1rem',
      marginRight: '1rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
      MozColumnGap: '1rem',
      columnGap: '1rem',
    },
    '@media (min-width: 640px)': {
      '.grid-system': {
        marginLeft: '2rem',
        marginRight: '2rem',
        gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
      },
    },
    '@media (min-width: 1024px)': {
      '.grid-system': {
        marginLeft: '120px',
        marginRight: '120px',
        gridTemplateColumns: 'repeat(12, minmax(0, 1fr))',
        MozColumnGap: '1.25rem',
        columnGap: '1.25rem',
      },
    },
    '@media (min-width: 1536px)': {
      '.grid-system': {
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '1296px',
      },
    },
  });

module.exports = {
  prefix: 'twcss-',
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
        sans: 'var(--font-body-family)',
      },
      colors: {
        black: '#000000',
        background: 'rgb(var(--color-background))',
        'gradient-background': 'var(--gradient-background)',
        foreground: 'rgb(var(--color-foreground))',
        shadow: 'rgb(var(--color-shadow))',
        button: {
          DEFAULT: 'rgb(var(--color-button))',
          text: 'rgb(var(--color-button-text))',
        },
        secondary: {
          button: {
            DEFAULT: 'rgb(var(--color-secondary-button))',
            text: 'rgb(var(--color-secondary-button-text))',
          },
        },
        link: 'rgb(var(--color-link))',
        badge: {
          foreground: 'rgb(var(--color-badge-foreground))',
          background: 'rgb(var(--color-badge-background))',
          border: 'rgb(var(--color-badge-border))',
        },
        'payment-terms-background-color':
          'var(--color-payment-terms-background-color)',
      },
    },
  },
  plugins: [plugin(gridSystem)],
};
