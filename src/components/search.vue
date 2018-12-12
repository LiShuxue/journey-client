<template>
  <div class="search">
    <input v-model="keywords" @keyup.enter="searchBlog" type="search" placeholder="请输入关键字查找" class="search-box"/>
    <button class="search-icon" @click="searchBlog">
        <i class="iconfont icon-search"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: ''
    }
  },
  methods: {
    searchBlog() {
      let keywords = this.keywords
      let blogList = [...this.$store.state.blogList]
      let blogListWithKeywords = blogList.filter((value) => {
        // tags中包含 或者 title中包含 或者 subTitle中包含 或者 content中包含
        return value.tags.join('').toUpperCase().indexOf(keywords.toUpperCase()) > -1 || 
               value.title.toUpperCase().indexOf(keywords.toUpperCase()) > -1 || 
               value.subTitle.toUpperCase().indexOf(keywords.toUpperCase()) > -1 || 
               value.content.toUpperCase().indexOf(keywords.toUpperCase()) > -1
      })
      this.$store.commit('saveFilterBlogList', blogListWithKeywords)
      this.$router.push('/bloglist')
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
  display: flex;
  padding: 5px 10px;
  background: $hui-bai;
  border-radius: 5%;
  font-size: $mediu-size;
}
input, button{
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
}
.search-box{
  flex-basis: 175px;
  height: 25px;
  background: $qian-hui;
  color: $hui-hei;
}
.search-icon{
  flex-basis: 25px;
  height: 25px;
  background: #C5C5C5;
  cursor: pointer;
  padding-top: 4px;
}
</style>
