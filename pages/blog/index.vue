<template lang="pug">
  main.mx-auto.max-w-screen-xl
    directory(title="Blog Posts" :posts="posts")
</template>

<script>
export default {
  async asyncData ({
    $content
  }) {
    const posts = await $content('posts', { deep: true })
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
