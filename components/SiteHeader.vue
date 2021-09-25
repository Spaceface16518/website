<template lang="pug">
  header.flex.flex-row.justify-between.py-2.px-3.bg-black.text-white
    // TODO: replace this with logo
    h1 Amrit Rathie
    nav.flex.flex-row.gap-3
      nuxt-link(to="/") Home
      nuxt-link(to="/about") About
      nuxt-link(to="/blog") Blog
</template>
