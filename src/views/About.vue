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
        <p>Email： <a href="#">1149926505@qq.com</a></p>
        <p>Blog： <a href="https://lishuxue.site" target="_blank">https://lishuxue.site</a></p>
        <p>
          Github：
          <a href="https://github.com/LiShuxue" target="_blank">https://github.com/LiShuxue</a>
        </p>
      </div>
    </div>
    <div class="others">
      <div class="qrcode">
        <img src="https://cdn.lishuxue.site/resume/images/MyWechat.png" />
      </div>
      <div class="resume">
        <div class="title" @click="getResume()">
          <div class="title-1">GET MY RESUME</div>
          <div class="title-2">点击下载简历</div>
        </div>
        <p>如果您愿意为我提供更好的工作机会，欢迎 Email 或者微信联系我！</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    getResume() {
      window.open('https://cdn.lishuxue.site/resume/李树雪-前端.pdf');
    },
  },
};
</script>

<style lang="scss">
.about {
  display: flex;
  width: $center-right;
  height: calc(100vh - 70px - 10px - 36px - 15px - 60px);
  box-sizing: border-box;
  border-radius: 10px;
  color: $hui-hei;

  .intro {
    width: 740px;
    box-sizing: border-box;
    margin-right: 10px;
    background: $hui-bai;
    border-radius: 10px;
    padding: 20px;

    .about-me {
      margin-bottom: 50px;
    }

    .about-me,
    .contact-me {
      font-size: $mediu-large-size;
      h2 {
        border-bottom: 1px solid $shen-hui;
      }
    }
  }

  .others {
    .qrcode {
      width: 300px;
      padding: 10px;
      margin-bottom: 20px;
      background: $hui-bai;
      border-radius: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .resume {
      width: 300px;
      padding: 10px;
      background: $hui-bai;
      border-radius: 10px;
      .title {
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
      .title-2 {
        font-size: $super-small-size;
      }
    }
  }
}

.is-mobile .about {
  flex-direction: column;
  width: auto;
  height: auto;

  .intro {
    width: auto;
    margin: 0 0 20px 0;
  }

  .qrcode,
  .resume {
    width: auto;
  }
}
</style>
