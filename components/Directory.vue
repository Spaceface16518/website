<template>
  <div>
    <header class="my-4">
      <h1 class="text-6xl font-bold">
        {{ title }}
      </h1>
    </header>
    <div class="px-2">
      <div v-for="{year, group} in groups" :key="year" class="grid gap-2 grid-split-side-header auto-rows-auto mb-4">
        <div class="border-r-2 border-t-2 border-dashed py-2 px-3">
          <h2 class="text-4xl text-right font-bold">
            {{ year }}
          </h2>
        </div>
        <ul class="w-full py-2 grid grid-flow-row auto-rows-min gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <li v-for="post in group" :key="post.updatedAt">
            <post-listing :post="post" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { IContentDocument } from '@nuxt/content/types/content'

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true
    },
    posts: {
      type: Array,
      required: false,
      default: () => []
    } as PropOptions<IContentDocument[]>
  },
  computed: {
    /**
     * Groups posts by year and returns them as a properly ordered array in an object keyed by year.
     */
    groups () {
      const years = {} as { [year: number]: IContentDocument[] }
      for (const post of this.posts) {
        const date = new Date(post.createdAt)
        const year = date.getFullYear()
        if (year in years) {
          years[year].push(post)
        } else {
          years[year] = [post]
        }
      }

      return Object.keys(years)
        .sort()
        .reverse()
        .map((year: string) => ({
          year,
          group: years[year as any].sort() // ew
        }))
    }
  }
})
</script>

<style scoped>
.grid-split-side-header {
  grid-template-columns: 1fr 5fr;
}
</style>
