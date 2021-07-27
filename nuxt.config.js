export default {
  target: 'static',

  head: {
    title: 'Amrit Rathie',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Website and blog of Amrit Rathie' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    'simpledotcss'
  ],

  plugins: [
    '~/plugins/title-case.ts'
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment'
  ],

  modules: [
    '@nuxt/content'
  ],

  content: {
    nestedProperties: true
  },

  build: {
  },

  publicRuntimeConfig: {
    indexPaginationLimit: 8
  }
}
