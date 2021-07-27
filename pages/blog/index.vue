<template lang="pug">
  main
    h1 Blog Posts
    ul
      li(v-for='post in posts')
        nuxt-link(:to='`/blog/${post.slug}`').flex.flex-row.justify-between.items-center.border-b.border-dashed.py-3.px-1
          span {{ post.title }}
          span {{ $moment(post.createdAt).format('MMM D, YYYY') }}

</template>

<script>
export default {
  async asyncData ({
    $content,
  }) {
    const posts = await $content('posts', { deep: true })
      .only(['title', 'createdAt', 'slug'])
      .sortBy('createdAt', 'desc')
      .fetch()
    return {
      posts
    }
  }
}
</script>

<style scoped>

</style>
