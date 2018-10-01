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
import mockdata from '../../../mock/mock'
export default {
  data () {
    return {
      msg: '',
      blogList: [],
      allBlogList: [],
      startArrIndex: 0,
      endArrIndex: 6,
      getMoreList: 6,
      canGetMore: true,
      cursor: 'cursor: pointer;',
      timer: null
    }
  },

  created () {
    this.axios.get(API.notRequireAuth.blogList).then(response => {
      if (response.data.blogList && response.data.blogList.length > 0) {
        this.$store.commit('saveBlogListMutation', response.data.blogList)
        this.allBlogList = response.data.blogList
        this.blogList = this.allBlogList.slice(this.startArrIndex, this.endArrIndex)
        if (this.blogList.length < this.allBlogList.length) {
          this.msg = '点击加载更多'
          this.cursor = 'cursor: pointer;'
          this.canGetMore = true
        } else {
          this.msg = '没有更多了'
          this.cursor = ''
          this.canGetMore = false
        }
      } else {
        this.$store.commit('saveBlogListMutation', mockdata.blogList)
        this.allBlogList = mockdata.blogList
        this.blogList = this.allBlogList.slice(this.startArrIndex, this.endArrIndex)
        this.msg = '没有更多了'
        this.cursor = ''
        this.canGetMore = false
      }
    }).catch(err => {
      this.$message.error(err.data.errMsg || err.data)
      this.$store.commit('saveBlogListMutation', mockdata.blogList)
      this.allBlogList = mockdata.blogList
      this.blogList = this.allBlogList.slice(this.startArrIndex, this.endArrIndex)
      this.msg = '没有更多了'
      this.cursor = ''
      this.canGetMore = false
    })
  },

  components: {
    SwipeBanner,
    BlogItem
  },

  methods: {
    getMore () {
      if (this.canGetMore) {
        this.msg = 'loading...'
        this.cursor = ''
        // 函数防抖
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.startArrIndex = this.startArrIndex + this.getMoreList
          this.endArrIndex = this.endArrIndex + this.getMoreList
          let moreList = this.allBlogList.slice(this.startArrIndex, this.endArrIndex)
          let newList = [...this.blogList, ...moreList]
          this.blogList = newList
          this.msg = '点击加载更多'
          this.cursor = 'cursor: pointer;'
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
  display: inline-block;
  text-align: center;
  font-size: 15px;
  line-height: 15px;
  color:$hui-hei;
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  background: $shen-hui;
}
</style>
