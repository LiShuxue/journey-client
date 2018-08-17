<template>
  <div class="home">
    <swipe-banner></swipe-banner>
    <blog-item></blog-item>
  </div>
</template>

<script>
import SwipeBanner from '@/components/SwipeBanner.vue'
import BlogItem from '@/components/BlogItem.vue'
export default {
  components: {
    SwipeBanner,
    BlogItem
  }
}
</script>

<style lang="scss" scoped>
</style>
