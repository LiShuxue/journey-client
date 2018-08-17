<template>
  <div class="blog-item">
    <div class="blog-image">
      <img src="../assets/img/slide.png">
    </div>
    <div class="blog-intro">
      <div class="title">我是标题我是标题</div>
      <div class="sub-title">我是子标题我是子标题</div>
      <div class="tool">
        <span class="iconfont icon-clock"></span><span class="content">2018-8-17</span>
        <span class="iconfont icon-eye"></span><span class="content">500</span>
        <span class="iconfont icon-comment"></span><span class="content">20</span>
        <span class="iconfont icon-like"></span><span class="content">33</span>
        <router-link to="/">
          <span class="iconfont icon-list"></span><span class="content">NodeJS</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-item{
  display: flex;
  box-sizing: border-box;
  width: 60vw;
  height: 150px;
  margin-top: 10px;
  padding: 8px;
  background: #F8F8F8;
}

.blog-image{
  flex-basis: 22vw;
  height: 130px;
  margin-right: 15px;
  img{
    width: 22vw;
    height: 130px;
    object-fit: cover;    // 通过这个属性实现background-size:cover的效果
  }
}

.blog-intro{
  position: relative;
  flex-grow: 1;
  height: 130px;
  color: #6D6D6D;

  .title{
    margin-top: 5px;
    font-weight: bold;
  }

  .sub-title{
    margin-top: 10px;
    font-size: 14px;
  }

  .tool{
    position: absolute;
    bottom: 10px;

    span{
      display: inline-block;
      margin-right: 5px;
    }

    .content{
      margin-right: 20px;
    }
  }
}
</style>
