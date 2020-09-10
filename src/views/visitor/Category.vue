<template>
  <div class="category">
    <h3>知识，要靠一点一滴的积累</h3>
    <div :class="{ 'category-list': !this.$store.state.isMobile }">
      <p v-for="(category, index) in categoryList" :key="index" @click="clickCategory(category)">
        <span class="icon iconfont icon-category"></span>
        <span>{{category}}</span>
        <span>（{{blogList.filter(value=>{return value.category===category}).length}}）</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import API from '@/ajax/api.js'

export default {
  computed: {
    ...mapState([
      'blogList'
    ]),
    ...mapGetters([
      'categoryList'
    ])
  },

  async created() {
    if (!this.blogList || this.blogList.length <= 0) {
      const response = await this.axios.get(API.notRequireAuth.blogList)
      const blogList = response.data.blogList
      this.$store.commit('saveBlogListMutation', blogList)
    }
  },

  methods: {
    clickCategory(category) {
      let blogListWithSameCategory = this.blogList.filter((value) => {
        return value.category === category
      })
      this.$store.commit('saveFilterBlogList', blogListWithSameCategory)
      this.$router.push('/bloglist')
    }
  }
}
</script>

<style lang="scss">
.category{
  position: fixed;
  overflow: scroll;
  width: $center-width;
  /*总高度 - 内容padding-top - more button margin-top - more button height - more button margin-bottom - footer height*/
  height: calc(100vh - 70px - 10px - 36px - 15px - 60px);
  box-sizing: border-box;
  border-radius: 10px;
  padding: 20px;
  background: $hui-bai;
  color: $hui-hei;

  p{
    display: flex;
    align-items: center;
    width: 150px;
    background: $qian-hui;
    padding: 5px;
    margin: 0 10px 10px 0;
    border-radius: 10px;
    cursor: pointer;
    font-size: $mediu-size;
    &:hover{
      background: $shen-hui;
    }
    .icon{
      width: 20px;
      margin-right: 5px;
    }
    :nth-child(2){
      margin-right: 5px;
    }
  }
  .category-list{
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 300px;
  }
}

.is-mobile .category{
  position: relative;
  width: auto;
  height: auto;
  padding: 10px 10px 10px 15px;
}
</style>
