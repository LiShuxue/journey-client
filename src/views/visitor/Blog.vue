<template>
  <div class="blog">
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
  .blog-title{
    margin: 10px 0 10px 0;
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
    width: 100%;
    padding-top: 35%; /* 210 / 600 = 0.35 */
    margin-bottom: 10px;
  }
  .blog-img > img{ /*子元素的宽高和容器一样*/
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
