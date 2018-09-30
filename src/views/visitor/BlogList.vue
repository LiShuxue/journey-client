<template>
  <div class="blog">
    <div class="blog-list" v-for="(item, index) in blogList" :key="index">
      <blog-item :blog="item"></blog-item>
    </div>
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
      'sameTagBlogList'
    ])
  },
  watch: {
    sameTagBlogList () {
      this.startArrIndex = 0
      this.endArrIndex = 6
      this.blogList = this.sameTagBlogList.slice(this.startArrIndex, this.endArrIndex)
      if (this.blogList.length < this.sameTagBlogList.length) {
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
    this.blogList = this.sameTagBlogList.slice(this.startArrIndex, this.endArrIndex)
    if (this.blogList.length < this.sameTagBlogList.length) {
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
          let moreList = this.sameTagBlogList.slice(this.startArrIndex, this.endArrIndex)
          let newList = [...this.blogList, ...moreList]
          this.blogList = newList
          this.msg = '点击加载更多'
          this.cursor = 'cursor: pointer;'
          if (this.endArrIndex >= this.sameTagBlogList.length - 1) {
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
.blog{
  box-sizing: border-box;
}
.more{
  font-size: 14px;
  color: $hui-hei;
  width: 100px;
  margin: 15px auto 5px auto;
}
</style>
