<template>
  <div class="blog-item">
    <div class="blog-image">
      <img :src="blog.image">
    </div>
    <div class="blog-intro">
      <div class="title">{{blog.title}}</div>
      <div class="sub-title">{{blog.subTitle}}</div>
      <div class="tool">
        <span class="iconfont icon-clock"></span><span class="content">{{blog.time}}</span>
        <span class="iconfont icon-eye"></span><span class="content">{{blog.eye}}</span>
        <span class="iconfont icon-comment"></span><span class="content">{{blog.comment.count}}</span>
        <span class="iconfont icon-like"></span><span class="content">{{blog.like}}</span>
        <router-link to="/">
          <span class="iconfont icon-list"></span><span class="content">{{blog.category}}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blog: Object
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
}

.blog-image{
  flex-basis: 175px;
  height: 120px;
  margin-right: 15px;
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;    // 通过这个属性实现background-size:cover的效果
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
