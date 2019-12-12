<template>
  <div class="recommend-wrapper">
    <p class="title">
      <span class="iconfont icon-top-ten"></span>
      <span>阅读排行</span>
    </p>
    <div class="article">
      <p class="article-item" v-for="(item, index) in hotBlogList" :key="index" @click="showBlogDetail(item)">
        {{item.title}}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'hotBlogList'
    ])
  },
  methods: {
    showBlogDetail (blog) {
      this.$store.dispatch('chooseBlogAction', blog).then(() => {
        if (this.$route.name !== 'blog') {
          this.$router.push('/blog')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-wrapper{
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
  font-size: $large-size;

  span{
    margin-right: 5px;
  }
}
.article{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 10px;
}
.article-item{
  background: $qian-hui;
  padding: 5px;
  margin: 0 10px 10px 0;
  border-radius: 10%;
  cursor: pointer;
  font-size: $mediu-size;
}
</style>
