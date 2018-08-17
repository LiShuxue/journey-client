<template>
  <div class="home">
    <swipe-banner></swipe-banner>
    <div class="blog-list" v-for="(item, index) in blogList" :key="index">
      <blog-item :blog="item"></blog-item>
    </div>
  </div>
</template>

<script>
import SwipeBanner from '@/components/SwipeBanner.vue'
import BlogItem from '@/components/BlogItem.vue'
export default {
  data () {
    return {
      blogList: [
        {
          title: '我是标题',
          subTitle: '我是子标题',
          image: require('../assets/img/slide.png'),  // 这里需要用require，因为webpack已经将图片打包处理，渲染出来的路径不对，所以需要用require
          time: '2018-08-17',
          eye: '500',
          like: '30',
          category: 'NodeJS',
          comment: {
            count: '20',
            list: [
              {time: '2018-08-17', content: '我是评论', arthur: 'test user'}
            ]
          }
        }
      ]
    }
  },

  components: {
    SwipeBanner,
    BlogItem
  }
}
</script>

<style lang="scss" scoped>
</style>
