<template>
  <nuxt-link
    :to="`/blog/${post.slug}`"
    class="h-full grid grid-cols-1 grid-rows-post gap-1 rounded-xl shadow transition hover:shadow-xl"
  >
    <header
      :class="`w-full from-${gradient.fromColor}-400 to-${gradient.toColor}-400 bg-gradient-to-tr rounded-t-xl pb-3`"
    >
      <h3 class="px-4 pt-4 pb-1 text-3xl">
        {{ post.title }}
      </h3>
    </header>
    <nuxt-content
      v-if="post.excerpt"
      :document="{ body: post.excerpt }"
      class="px-1 overflow-hidden overflow-ellipsis"
    />
    <p v-else class="px-1 overflow-hidden overflow-ellipsis">
      {{ post.description }}
    </p>
    <div class="p-3 text-gray-700 mt-auto justify-self-end">
      {{ $moment(post.createdAt).format('MMMM D, YYYY') }}
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'

export default Vue.extend({
  name: 'PostListing',
  props: {
    post: {
      type: Object,
      required: true
    } as PropOptions<IContentDocument>
  },
  data () {
    // TODO: different gradient based on post type
    return {
      gradient: {
        fromColor: 'blue',
        toColor: 'green'
      }
    }
  }
})
</script>
