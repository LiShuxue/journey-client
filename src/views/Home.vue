<template>
  <div class="home">
    <swipe-banner></swipe-banner>
    <div class="blog-list" v-for="(item, index) in blogList" :key="index">
      <blog-item :blog="item"></blog-item>
    </div>
  </div>
</template>

<script>
import mockdata from '@/mock/mock'
import SwipeBanner from '@/components/SwipeBanner.vue'
import BlogItem from '@/components/BlogItem.vue'
export default {
  data () {
    return {
      blogList: mockdata.blogList
    }
  },

  components: {
    SwipeBanner,
    BlogItem
  }
}
</script>

<style lang="scss" scoped>
.home{
  box-sizing: border-box;
}
</style>
