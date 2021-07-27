<template lang="pug">
  main
    h1 {{ $titleCase($route.params.taxonomy) }}: {{ $titleCase($route.params.taxon) }}
    ul
      li(v-for='post in posts')
        nuxt-link(:to='`/blog/${post.slug}`').flex.flex-row.justify-between.items-center.border-b.border-dashed.py-3.px-1
          span {{ post.title }}
          span {{ $moment(post.createdAt).format('MMM D, YYYY') }}
</template>

<script>
import pluralize from 'pluralize'
export default {
  async asyncData ({
    $content,
    params,
    error
  }) {
    const posts = await
    $content('posts', { deep: true })
      .where({ [pluralize(params.taxonomy)]: { $contains: params.taxon } })
      .fetch()
      .catch(err => error({
        statusCode: 500,
        message: err
      }))
    return {
      posts
    }
  }
}

</script>

<style scoped>

</style>
