<template>
  <div class="about">
    <div class="intro">
      <div class="about-me">
        <h2>关于我</h2>
        <p>前端工程师</p>
        <p>熟悉Vue，React，移动开发，混合开发</p>
        <p>热爱编程，喜欢探索，追求技术</p>
      </div>
      <div class="contact-me">
        <h2>联系我</h2>
        <p>Blog： <a href="http://lishuxue.site" target="_blank">http://lishuxue.site</a></p>
        <p>Github： <a href="https://github.com/LiShuxue" target="_blank">https://github.com/LiShuxue</a></p>
        <p>Email： <a href="#">1149926505@qq.com</a></p>
      </div>
    </div>
    <div class="others">
      <div class="qrcode">
        <img src="http://cdn.lishuxue.site/MyWechat.png">
      </div>
      <div class="resume">
        <div class="title" @click="getResume()">
          <div class="title-1">GET MY RESUME</div>
          <div class="title-2">点击文字下载</div>
        </div>
        <p>如果您愿意为我提供更好的工作机会，欢迎 Email 或者微信联系我！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    getResume() {
      window.open('http://cdn.lishuxue.site/MyResume.pdf')
    }
  }
}
</script>

<style lang="scss">
.about{
  display: flex;
  width: 950px;
  height: calc(100vh - 70px - 10px - 36px - 15px - 60px);
  box-sizing: border-box;
  border-radius: 10px;
  color: $hui-hei;

  .intro{
    width: 640px;
    box-sizing: border-box;
    margin-right: 10px;
    background: $hui-bai;
    border-radius: 10px;
    padding: 20px;

    .about-me{
      margin-bottom: 50px;
    }

    .about-me, .contact-me{
      font-size: $mediu-large-size;
      h2{
        border-bottom: 1px solid $shen-hui;
      }
    }
  }

  .others{
    .qrcode{
      width: 300px;
      padding: 10px;
      margin-bottom: 20px;
      background: $hui-bai;
      border-radius: 10px;
      img{
        width: 100%;
        height: 100%;
      }
    }

    .resume{
      width: 300px;
      padding: 10px;
      background: #F8F8F8;
      border-radius: 10px;
      .title{
        height: 100px;
        box-sizing: border-box;
        text-align: center;
        padding-top: 35px;
        margin-bottom: 35px;
        background: $qian-hui;
        font-size: $super-large-size;
        font-weight: 700;
        cursor: pointer;
      }
      .title-2{
        font-size: $small-size;
      }
    }
  }
}

.is-mobile .about{
  flex-direction: column;
  width: auto;
  height: auto;

  .intro{
    width: auto;
    margin: 0 0 20px 0;
  }

  .qrcode, .resume{
    width: auto;
  }
}
</style>
