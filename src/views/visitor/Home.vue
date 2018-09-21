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
import mockdata from '../../../mock/mock'
import SwipeBanner from '@/components/SwipeBanner.vue'
import BlogItem from '@/components/BlogItem.vue'
import API from '@/ajax/api.js'
export default {
  data () {
    return {
      msg: '点击加载更多',
      blogList: [],
      isLoading: false,
      cursor: 'cursor: pointer;'
    }
  },

  created () {
    this.axios.get(API.notRequireAuth.blogList).then(response => {
      if (response.data.blogList && response.data.blogList.length > 0) {
        this.blogList = response.data.blogList
        this.blogList.forEach(item => {
          item.publishTime = item.publishTime.substring(0, 10)
        })
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
      if (!this.isLoading) {
        this.isLoading = true
        this.msg = 'loading...'
        this.cursor = ''
        setTimeout(() => {
          let newList = [...this.blogList, ...mockdata.blogList]
          this.blogList = newList
          this.msg = '点击加载更多'
          this.cursor = 'cursor: pointer;'
          this.isLoading = false
        }, 2000)
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
