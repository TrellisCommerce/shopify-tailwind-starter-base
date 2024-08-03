module.exports = {
  prefix: 'twcss-',
  safelist: [
    {
      pattern: /.*/,
      variants: ['xs', 'sm', 'md', 'lg', 'hover', 'group-hover'],
    },
  ],
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
    // ITC Benguiat replaces Revans
    // Futura replaces Fenomen
    // More comments you want to leave for others!
    fontFamily: {
      serif: ['ITC Benguiat'],
      sans: ['Futura'],
    },
    fontSize: {
      // Primary Body Copy - Body 12
      sm: [
        '12px',
        {
          lineHeight: '150%',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      // Primary Body Copy - Body 14
      base: [
        '14px',
        {
          lineHeight: '150%',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
    },
    colors: {
      // Default
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      // Primary
      // The primary colors should be utilized for the majority of brand and its application from retail to web.
      primary: {
        red: '#E12727',
        grey: '#898E8E',
      },
      // Flavors
      flavor: {
        chocolate: '#AC6E39',
        vanilla: '#ECD798',
        blue: '#079ADA',
        espresso: '#7F5EC7',
      },
      // Secondary
      // The secondary palette should be utilized sparingly and for specific situations that call for seasonal and holiday-themed design or association.
      secondary: {
        orange: '#D24728',
        red: '#9B0F17',
        pink: '#A1316A',
        green: '#00793F',
        purple: '#3D3385',
        blue: '#284196',
      },
      // Greys
      // The grayscale palette should be utilized as a neutral complement to the primary and secondary colors in situations that call for more than a basic black background. They also provide a tool to create visual hierarchy in branded documentation.
      grey: {
        light: '#DEDBD9',
        DEFAULT: '#5C5957',
        dark: '#464442',
        darker: '#201E1D',
      },
    },
    spacing: {
      8: '8px',
      16: '16px',
      // Spacing between components for mobile
      // Margins for mobile
      32: '32px',
      // Spacing between components for tablet
      // Margins for tablet
      48: '48px',
      64: '64px',
      // Spacing between components for desktop
      // Margins for desktop
      80: '80px',
      112: '112px',
      144: '144px',
    },
  },
  plugins: [],
};
