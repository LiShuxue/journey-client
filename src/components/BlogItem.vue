<template>
  <div class="blog-item" @click="showBlogDetail(blog)">
    <div class="blog-image">
      <img :src="blog.image.url" :alt="blog.image.name">
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
        <div @click.stop="clickLike" style="display: inline" v-bind:class="[{'liked': isLiked}]"><span class="iconfont icon-like"></span><span class="content">{{blog.like}}</span></div>
        <div @click.stop="clickCategory" style="display: inline"><span class="iconfont icon-list"></span><span class="content">{{blog.category}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import API from '@/ajax/api.js'

export default {
  props: {
    blog: Object
  },
  data() {
    return {
      isLiked: false
    }
  },
  created() {
    // 将点赞过的文章显示出来
    if (Object.keys(localStorage).includes(this.blog._id) && localStorage.getItem(this.blog._id) === 'true') {
      this.isLiked = true;
    }
  },
  methods: {
    showBlogDetail (blog) {
      if(this.$store.state.isMenuOpen){
        this.$store.commit('openOrCloseMenuMutation', false);
      }
      this.$store.dispatch('chooseBlogAction', blog).then(() => {
        if (this.$route.name !== 'blog') {
          this.$router.push('/blog')
        }
      })
    },
    clickComments () {
      console.log('comments')
    },
    clickLike () {
      this.sentry.addBreadcrumb('components/BlogItem.vue --> method: clickLike')

      // 点赞后存在本地，下次进来的时候显示点赞过
      if (!this.isLiked) {
        this.isLiked = true;
        localStorage.setItem(this.blog._id, this.isLiked);
      } else {
        this.isLiked = false;
        localStorage.removeItem(this.blog._id);
      }
      
      this.axios.post(API.notRequireAuth.likeBlog, {
        id: this.blog._id,
        isLiked: this.isLiked
      }).then(response => {
        // 刷新页面显示
        if (this.isLiked) {
          this.blog.like++;
        } else {
          this.blog.like--;
        }
      }).catch(err => {
        this.sentry.captureException(err)
        err && this.$message.error(err.data.errMsg || err.data)
      })
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
  margin-top: 15px;
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
  flex-basis: $blog-item-image-width;
  height: $blog-item-height;
  margin-right: 15px;
  box-sizing: border-box;
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
    transform: rotate(-45deg) translate(-7px, -20px);
    transform-origin: center;
    color: $hui-bai;
    background: $qian-lan;
    font-size: $mediu-small-size;
    width: 50px;
    padding-top: 20px;
    opacity: 0.7;
  }
}

.blog-intro{
  position: relative;
  flex-basis: $blog-item-intro-width;
  height: $blog-item-height;
  color: $hui-hei;
  padding: 0 10px;
  box-sizing: border-box;
  .title{
    margin-top: 5px;
    font-weight: bold;
    font-size: $mediu-large-size;
  }

  .sub-title{
    margin-top: 10px;
    font-size: $mediu-size;
  }

  .tool{
    position: absolute;
    bottom: 10px;

    span{
      display: inline-block;
      margin-right: 5px;
      font-size: $mediu-small-size;
    }

    .content{
      margin-right: 20px;
    }

    .liked {
      color: #2192F5;
    }
  }
}
</style>
