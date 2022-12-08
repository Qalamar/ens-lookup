const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  theme: {
    extend: {
      animation: {
        shimmer: 'shimmer 8s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          from: { backgroundPosition: '200% 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      fontFamily: {
        greycliff: ['Greycliff Arabic CF', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        electric: '#db00ff',
        ribbon: '#0047ff',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
