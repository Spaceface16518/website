/* eslint-disable quote-props */
module.exports = {
  jit: true,
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      gridTemplateRows: {
        // 'post': 'minmax(60px, 136px) minmax(max-content, auto) min-content'
        'post': '1fr minmax(max-content, auto) min-content'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
