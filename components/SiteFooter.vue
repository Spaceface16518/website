<template lang="pug">
  footer
    div.flex.flex-row.justify-between.items-start
      div
        h2 Links
        ul.p-0
          li
            a(href='/feed.xml') RSS Feed
      div(v-if='recentPosts')
        h2 Recent Posts
        ul.p-0
          li(v-for='post in recentPosts')
            a(:href='`/blog/${post.slug}`') {{ post.title }}
      div(v-if='socials')
        h2 Social
        ul.p-0
          li(v-for='social in socials' :key="social.name")
            a(:href='social.url') {{ social.name }}
    div
      p Copyright Amrit Rathie &copy; {{ new Date().getFullYear() }}
</template>

<script>
export default {
  data () {
    return {
      recentPosts: undefined,
      socials: []
    }
  },
  async fetch () {
    this.recentPosts = await this.$content('posts', { deep: true })
      .only(['title', 'createdAt', 'slug'])
      .sortBy('updatedAt', 'desc')
      .limit(5)
      .fetch()
    this.socials = await this.$content('socials').only(['name', 'url']).fetch()
  }
}
</script>

<style scoped>
footer h2 {
  @apply text-lg;
}

footer a {
  @apply text-sm;
}
</style>
