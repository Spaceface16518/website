<template lang="pug">
  main
    header
      h1 {{ page.title }}
      p( v-if="page.description") {{ page.description }}
      nav
        nuxt-link(v-for='tag in page.tags' :key="tag" :to="`/blog/tag/${tag}`")
          span {{ $titleCase(tag) }}
    nuxt-content(:document="page").max-w-prose
</template>

<script>
export default {
  async asyncData ({
    $content,
    params,
    error
  }) {
    const pages = await $content('posts', { deep: true })
      .where({ slug: params.slug })
      .limit(1)
      .fetch()
      .catch(err => error({
        statusCode: 404,
        message: `Page not found: ${err}`
      }))
    if (pages.length) {
      return {
        page: pages[0]
      }
    } else {
      error({
        statusCode: 404,
        message: `Page not found: ${params.slug}`
      })
    }
  }
}
</script>

<style scoped>

</style>
