<template>
  <div class="blog">
    <div v-if="blog.isOriginal" class="blog-mark">原创</div>
    <div v-else class="blog-mark">转载</div>
    <h1 class="blog-title">{{blog.title}}</h1>
    <div class="blog-img">
      <img :src="blog.image" :alt="blog.subTitle">
    </div>
    <div class="blog-content">
      <div v-if="blog.markdownContent" class="markdown-body" v-html="blog.htmlContent"></div>
      <div v-else class="html-body" v-html="blog.htmlContent"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      blog: 'chooseBlog'
    })
  }
}
</script>
<style lang="scss">
.blog{
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 0 20px 40px 20px;
  background: $hui-bai;
  .blog-mark{
    position: absolute;
    display: inline-block;
    text-align: center;
    top: 0;
    left: 0;
    transform: rotate(-45deg) translate(-8px, -22px);
    transform-origin: center;
    color: $hui-bai;
    background: $qian-lan;
    font-size: $mediu-small-size;
    width: 60px;
    padding: 23px 0 1px 0;
    opacity: 0.7;
  }
  .blog-title{
    margin: 25px 0 30px 0;
    display: flex;
    justify-content: center;
    font-size: $super-large-size;
  }

  .blog-content{ 
    @import "../../assets/style/markdown"; 
    
    .html-body {
      pre {
        background-color: #DADADA;
        border-radius: 3px;
        font-size: 85%;
        line-height: 1.45;
        overflow: auto;
        padding: 16px;

        .code {
          font-size: 12px;
        }
      }
    }
  }
  
  /*下面的方法实现长宽比*/
  .blog-img {
    position: relative; /*容器所有子元素需要绝对定位*/
    height: 0; /*容器高度是由padding来控制*/
    padding-top: 35.7%; /* 250 / 700 = 0.357 */
    margin-bottom: 15px;
    border: 5px solid $shen-hui;
    border-radius: 5px;
  }
  .blog-img > img{ /*子元素的宽高和容器一样*/
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: .9;
    &:hover{
      opacity: 1;
      transition: all .25s;
    }
  }
}
</style>
