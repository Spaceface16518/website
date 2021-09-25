<template lang="pug">
  main.mx-auto.max-w-screen-xl
    directory(:title="`${ $titleCase($route.params.taxonomy) } : ${ $titleCase($route.params.taxon) }`" :posts="posts")
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
