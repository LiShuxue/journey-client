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
      this.$router.push({
        name: 'bloglist',
        query: {
          keywords: this.keywords
        }
      })
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
.is-mobile .search{
  display: none;
}
</style>
