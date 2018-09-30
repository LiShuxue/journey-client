<template>
  <div class="category-wrapper">
    <p class="title">
      <span class="iconfont icon-list"></span>
      <span>标签</span>
    </p>
    <p class="category">
      <span class="category-item" v-for="(item, index) in tagList" :key="index" @click="clickTag(item)">
        {{item}}
      </span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'tagList'
    ])
  },
  methods: {
    clickTag (tag) {
      let blogList = [...this.$store.state.blogList]
      let blogListWithSameTag = blogList.filter((value) => {
        return value.tags.includes(tag)
      })
      this.$store.commit('saveSameTagBlogList', blogListWithSameTag)
      this.$router.push('/bloglist')
    }
  }
}
</script>

<style lang="scss" scoped>
.category-wrapper{
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px 10px 0 10px;
  background: $hui-bai;
  border-radius: 5%;
  color: $hui-hei;
}

.title{
  padding: 5px 10px 6px 0;
  border-bottom: 1px dashed $shen-hui;

  span{
    margin-right: 5px;
  }
}
.category{
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.category-item{
  background: $shen-hui;
  padding: 5px;
  margin: 0 10px 10px 0;
  border-radius: 10%;
  cursor: pointer;
  font-size: 13px;
}
</style>
