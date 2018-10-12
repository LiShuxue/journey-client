<template>
  <div class="blog-list">
    <blog-item v-for="(item, index) in blogList" :blog="item" :key="index"></blog-item>
    <div class="more" @click="getMore" :style="cursor">{{msg}}</div>
  </div>
</template>

<script>
import BlogItem from '@/components/BlogItem.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      msg: '',
      blogList: [],
      startArrIndex: 0,
      endArrIndex: 6,
      getMoreList: 6,
      canGetMore: true,
      cursor: 'cursor: pointer;',
      timer: null
    }
  },
  computed: {
    ...mapState([
      'filterBlogList'
    ])
  },
  watch: {
    filterBlogList () {
      this.startArrIndex = 0
      this.endArrIndex = 6
      this.blogList = this.filterBlogList.slice(this.startArrIndex, this.endArrIndex)
      if (this.blogList.length < this.filterBlogList.length) {
        this.msg = '点击加载更多'
        this.cursor = 'cursor: pointer;'
        this.canGetMore = true
      } else {
        this.msg = '没有更多了'
        this.cursor = ''
        this.canGetMore = false
      }
    }
  },
  created () {
    this.blogList = this.filterBlogList.slice(this.startArrIndex, this.endArrIndex)
    if (this.blogList.length < this.filterBlogList.length) {
      this.msg = '点击加载更多'
      this.cursor = 'cursor: pointer;'
      this.canGetMore = true
    } else {
      this.msg = '没有更多了'
      this.cursor = ''
      this.canGetMore = false
    }
  },
  components: {
    BlogItem
  },

  methods: {
    getMore () {
      if (this.canGetMore) {
        this.msg = 'loading...'
        this.cursor = ''
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.startArrIndex = this.startArrIndex + this.getMoreList
          this.endArrIndex = this.endArrIndex + this.getMoreList
          let moreList = this.filterBlogList.slice(this.startArrIndex, this.endArrIndex)
          let newList = [...this.blogList, ...moreList]
          this.blogList = newList
          this.msg = '点击加载更多'
          this.cursor = 'cursor: pointer;'
          if (this.endArrIndex >= this.filterBlogList.length - 1) {
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
.blog-list{
  box-sizing: border-box;
}
.blog-item:first-child{
  margin-top: 0px;
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
