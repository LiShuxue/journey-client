<template>
  <div class="blog-item" @click="showBlogDetail(blog)">
    <div class="blog-image">
      <img :src="blog.image">
      <div v-if="blog.isOriginal" class="blog-mark">原创</div>
      <div v-else class="blog-mark">转载</div>
    </div>
    <div class="blog-intro">
      <div class="title">{{blog.title}}</div>
      <div class="sub-title">{{blog.subTitle}}</div>
      <div class="tool">
        <span class="iconfont icon-clock"></span><span class="content">{{blog.publishTime.substring(0, 10)}}</span>
        <span class="iconfont icon-eye"></span><span class="content">{{blog.see}}</span>
        <div @click.stop="clickComments" style="display: inline"><span class="iconfont icon-comment"></span><span class="content">{{blog.comments.length}}</span></div>
        <div @click.stop="clickLike" style="display: inline"><span class="iconfont icon-like"></span><span class="content">{{blog.like}}</span></div>
        <div @click.stop="clickCategory" style="display: inline"><span class="iconfont icon-list"></span><span class="content">{{blog.category}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blog: Object
  },
  methods: {
    showBlogDetail (blog) {
      if(this.$store.state.isMenuOpen){
        this.$store.commit('openOrCloseMenuMutation', false);
      }
      this.$store.commit('chooseBlog', blog)
      if (this.$route.name !== 'blog') {
        this.$router.push('/blog')
      }
    },
    clickComments () {
      console.log('comments')
    },
    clickLike () {
      console.log('like')
    },
    clickCategory () {
      console.log('category')
    }
  }
}
</script>

<style lang="scss" scoped>
.blog-item{
  display: flex;
  box-sizing: border-box;
  height: 135px;
  margin-top: 10px;
  padding: 7px;
  background: $hui-bai;
  *{
    cursor: pointer;
  }
  &:hover{
    background: $shen-hui;
    img{
      transform: scale(1.1);
      transition: all 0.25s;
    }
  }
}

.blog-image{
  position: relative;
  overflow: hidden;
  flex-basis: 175px;
  height: 120px;
  margin-right: 15px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;    // 通过这个属性实现background-size:cover的效果
  }
  .blog-mark{
    position: absolute;
    display: inline-block;
    text-align: center;
    top: 0;
    left: 0;
    transform: rotate(-45deg) translate(-5px, -20px);
    transform-origin: center;
    color: $hui-bai;
    background: $qian-lan;
    font-size: 12px;
    width: 50px;
    padding-top: 20px;
    opacity: 0.7;
  }
}

.blog-intro{
  position: relative;
  flex-basis: 410px;
  height: 120px;
  color: $hui-hei;

  .title{
    margin-top: 5px;
    font-weight: bold;
    font-size: 15px;
  }

  .sub-title{
    margin-top: 10px;
    font-size: 13px;
  }

  .tool{
    position: absolute;
    bottom: 10px;

    span{
      display: inline-block;
      margin-right: 5px;
      font-size: 14px;
    }

    .content{
      margin-right: 20px;
    }
  }
}
</style>
