<template lang="pug">
  main.pt-5.px-2.mx-auto.max-w-screen-md
    article.prose.mx-auto
      header
        h1 {{ page.title }}
        p( v-if="page.description") {{ page.description }}
      nuxt-content(:document="page")
    aside
      nav.flex.flex-row.justify-center.items-center.flex-wrap.gap-3.p-3
        span(v-for='tag in page.tags' :key="tag").p-2 #
          nuxt-link(:to="`/blog/tag/${tag}`").underline {{ $titleCase(tag) }}
      div.flex.flex-row.flex-nowrap.justify-between.items-center
        nuxt-link(v-if="prev" :to='`/blog/${prev.slug}`') {{ prev.title }} // TODO: add path
        nuxt-link(v-if="next" :to='`/blog/${next.slug}`') {{ next.title }} // TODO: add path

</template>

<script>
export default {
  name: 'Post',
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
      const page = pages[0]

      const [prev, next] = await $content('posts')
        .only(['title', 'slug', 'date'])
        .sortBy('date').surround(params.slug).fetch()
      return {
        page,
        prev,
        next
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
