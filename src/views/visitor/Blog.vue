<template>
  <div class="blog">
    <div v-if="blog.isOriginal" class="blog-mark">原创</div>
    <div v-else class="blog-mark">转载</div>
    <h3 class="blog-title">{{blog.title}}</h3>
    <div class="blog-img">
      <img :src="blog.image" :alt="blog.subTitle">
    </div>
    <div class="blog-content">
      <span v-html="blog.content"></span>
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
<style lang="scss" scoped>
.blog{
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 0 20px;
  color: $hui-hei;
  background: $hui-bai;
  .blog-mark{
    position: absolute;
    display: inline-block;
    text-align: center;
    top: 0;
    left: 0;
    transform: rotate(-45deg) translate(-8px, -20px);
    transform-origin: center;
    color: $hui-bai;
    background: $qian-lan;
    font-size: 12px;
    width: 60px;
    padding: 20px 0 5px 0;
    opacity: 0.7;
  }
  .blog-title{
    margin: 30px 0 20px 0;
    display: flex;
    justify-content: center;
  }
  .blog-content{
    display: flex;
    justify-content: center;
  }

  /*下面的方法实现长宽比*/
  .blog-img {
    position: relative; /*容器所有子元素需要绝对定位*/
    height: 0; /*容器高度是由padding来控制*/
    padding-top: 35%; /* 210 / 600 = 0.35 */
    margin-bottom: 10px;
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
