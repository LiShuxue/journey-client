<template>
  <div class="home">
    <swipe-banner></swipe-banner>
    <div class="blog-list" v-for="(item, index) in blogList" :key="index">
      <blog-item :blog="item"></blog-item>
    </div>
    <div class="more" @click="getMore" :style="cursor">{{msg}}</div>
  </div>
</template>

<script>
import SwipeBanner from '@/components/SwipeBanner.vue'
import BlogItem from '@/components/BlogItem.vue'
import API from '@/ajax/api.js'
export default {
  data () {
    return {
      msg: '点击加载更多',
      blogList: [],
      allBlogList: [],
      startArrIndex: 0,
      endArrIndex: 6,
      getMoreList: 6,
      canGetMore: true,
      isLoading: false,
      cursor: 'cursor: pointer;'
    }
  },

  created () {
    this.axios.get(API.notRequireAuth.blogList).then(response => {
      if (response.data.blogList && response.data.blogList.length > 0) {
        this.allBlogList = response.data.blogList
        this.allBlogList.forEach(item => {
          item.publishTime = item.publishTime.substring(0, 10)
        })
        this.blogList = this.allBlogList.slice(this.startArrIndex, this.endArrIndex)
      }
    }).catch(err => {
      this.$message.error(err.data.errMsg || err.data)
    })
  },

  components: {
    SwipeBanner,
    BlogItem
  },

  methods: {
    getMore () {
      // 通过函数节流原理，设置一个标志位，防止多次点击多次请求
      if (this.canGetMore && !this.isLoading) {
        this.isLoading = true
        this.msg = 'loading...'
        this.cursor = ''
        setTimeout(() => {
          this.startArrIndex = this.startArrIndex + this.getMoreList
          this.endArrIndex = this.endArrIndex + this.getMoreList
          let moreList = this.allBlogList.slice(this.startArrIndex, this.endArrIndex)
          let newList = [...this.blogList, ...moreList]
          this.blogList = newList
          this.msg = '点击加载更多'
          this.cursor = 'cursor: pointer;'
          this.isLoading = false
          if (this.endArrIndex >= this.allBlogList.length - 1) {
            this.msg = '没有更多了'
            this.cursor = ''
            this.canGetMore = false
          }
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home{
  box-sizing: border-box;
}
.more{
  font-size: 14px;
  color: $hui-hei;
  width: 100px;
  margin: 15px auto 5px auto;
}
</style>
