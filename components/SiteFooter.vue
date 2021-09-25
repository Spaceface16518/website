<template lang="pug">
  footer.border-t.p-2
    div.flex.flex-row.justify-between.items-start
      div
        h2 Links
        ul.p-0
          li
            a(href='/feed.xml') RSS Feed
      div(v-if='recentPosts.length')
        nuxt-link(to="/blog")
          h2 Recent
        ul.p-0
          li(v-for='post in recentPosts')
            nuxt-link(:to='`/blog/${post.slug}`') {{ post.title }}
      div(v-if='socials.length')
        h2 Social
        ul.p-0
          li(v-for='social in socials' :key="social.name")
            a(:href='social.url') {{ social.name }}
    div
      p.text-center Copyright Amrit Rathie &copy; {{ new Date().getFullYear() }}
</template>

<script lang="ts">
import Vue from 'vue'

interface Social {
  name: string,
  url: string
}

interface RecentPost {
  title: string,
  slug: string
}

export default Vue.extend({
  data () {
    return {
      recentPosts: [] as RecentPost[],
      socials: [] as Social[]
    }
  },
  async fetch () {
    this.recentPosts = await this.$content('posts', { deep: true })
      .only(['title', 'slug'])
      .sortBy('updatedAt', 'desc')
      .limit(3)
      .fetch<RecentPost>() as RecentPost[]
    this.socials = await this.$content('socials').only(['name', 'url']).fetch<Social>() as Social[]
  }
})
</script>

<style scoped>
footer {
  @apply max-w-4xl;
}

footer h2 {
  @apply text-lg;
}

footer a {
  @apply text-sm;
}
</style>
