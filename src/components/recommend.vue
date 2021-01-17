<template>
  <div :class="['recommend-wrapper', { 'sticky-top': stickyTop }]" ref="stickyWrapper">
    <p class="title">
      <span class="iconfont icon-top-ten"></span>
      <span>阅读排行</span>
    </p>
    <div class="article">
      <p class="article-item" v-for="(item, index) in hotBlogList" :key="index" @click="showBlogDetail(item)">
        {{ item.title }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      offsetTop: 0,
      stickyTop: false
    };
  },
  computed: {
    ...mapGetters(['hotBlogList'])
  },
  mounted() {
    setTimeout(() => {
      // 设置元素渲染之后的距离文档顶端的距离
      this.offsetTop = this.$refs.stickyWrapper.offsetTop;
      // 设置滚动事件
      window.addEventListener('scroll', this.handleScroll);
    }, 1000);
  },
  methods: {
    showBlogDetail(blog) {
      this.$store.dispatch('chooseBlogAction', blog).then(() => {
        if (this.$route.name !== 'blog') {
          this.$router.push(`/blog/${blog._id}`);
        }
      });
    },

    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= this.offsetTop - 70) {
        this.stickyTop = true;
      } else {
        this.stickyTop = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sticky-top {
  position: fixed;
  /* position: sticky; 未来可以用这个属性值*/
  top: 70px;
  margin-top: 0 !important;
  width: $right-width;
  box-sizing: border-box;
}
.recommend-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px;
  background: $hui-bai;
  border-radius: 5%;
  color: $hui-hei;
}

.title {
  padding: 5px 10px 6px 0;
  border-bottom: 1px dashed $shen-hui;
  font-size: $large-size;

  span {
    margin-right: 5px;
  }
}
.article {
  display: flex;
  flex-direction: column;
  flex-wrap: no-wrap;
  margin-top: 10px;
  max-height: 500px;
  overflow: scroll;
}
.article-item {
  background: $qian-hui;
  padding: 5px;
  margin: 0 10px 10px 0;
  border-radius: 10%;
  cursor: pointer;
  font-size: $mediu-size;
}

.is-mobile .recommend-wrapper {
  display: none;
}
</style>
