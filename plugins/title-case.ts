import { Plugin } from '@nuxt/types'
import { titleCase } from 'title-case'

declare module 'vue/types/vue' {
  // this.$titleCase inside Vue components
  interface Vue {
    $titleCase (input: string): string
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$titleCase inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $titleCase (input: string): string
  }

  // nuxtContext.$titleCase
  interface Context {
    $titleCase (input: string): string
  }
}

const myPlugin: Plugin = (_context, inject) => {
  inject('titleCase', titleCase)
}

export default myPlugin
