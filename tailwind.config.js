module.exports = {
  prefix: 'twcss-',
  // safelist is added to provide all styles for design to add through the admin
  safelist: [
    {
      pattern: /.*/,
      variants: ['xs', 'sm', 'md', 'lg', 'xl', 'hover', 'group-hover'],
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
      xl: '1440px',
      '2xl': '1920px',
      pageMaxWidth: '1440px',
    },
    // Gill Sans Nova Semi Bold for Headings
    // Futura Regular for Text & Buttons
    // Futura Medium for Navigation
    fontFamily: {
      sans: ['Gill Sans Nova Semi Bold'],
      sans: ['Futura'],
    },
    fontSize: {
      // BODY COPY SIZES
      // Body Copy 12
      bc12: [
        '1.2rem',
        {
          lineHeight: '2.4rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      // Body Copy 14
      bc14: [
        '1.4rem',
        {
          lineHeight: '2.4rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      // Body Copy 16
      bc16: [
        '1.6rem',
        {
          lineHeight: '2.4rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      // Body Copy 18
      bc18: [
        '1.8rem',
        {
          lineHeight: '2.4rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      // SUB-HEADINGS SIZES
      // Subhead 18
      sh18: [
        '1.8rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0.4',
          fontWeight: '400',
        },
      ],
      // Subhead 22
      sh18: [
        '2.2rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0.4',
          fontWeight: '400',
        },
      ],
      // Subhead 28
      sh18: [
        '2.8rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0.4',
          fontWeight: '400',
        },
      ],
      // HEADINGS SIZES
      // Heading 1 -- h1d is larger viewports and h1m is mobile viewports
      h1d: [
        '7.5rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      h1m: [
        '4.8rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      // Heading 2 -- h2d is larger viewports and h2m is mobile viewports
      h2d: [
        '6.0rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      h2m: [
        '4.0rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      // Heading 3 -- h3d is larger viewports and h3m is mobile viewports
      h3d: [
        '4.6rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      h3m: [
        '3.3rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      // Heading 4 -- h4d is larger viewports and h4m is mobile viewports
      h4d: [
        '3.4rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      h4m: [
        '2.8rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      // Heading 5 -- h5d is larger viewports and h5m is mobile viewports
      h5d: [
        '2.8rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      h5m: [
        '2.2rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      // Heading 6 -- h6d is larger viewports and h6m is mobile viewports
      h6d: [
        '2.4rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
      h6m: [
        '1.8rem',
        {
          lineHeight: '1.6rem',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
    },
    colors: {
      // Default
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      // Primary
      primary: {
        blue: '#003299',
        darkblue: '#001D7C',
      },
      // Secondary
      secondary: {
        tan: '#F3F1E9',
      },
      // Greys
      grey: {
        lightgrey: '#6D7175',
        darkgrey: '#202223',
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
  },
  plugins: [],
};
