<template>
  <div class="one">
    <div class="main">
      <div class="image">
        <img :src="imageUrl" alt="图片加载中..." />
      </div>
      <div class="line"></div>
      <div class="text">{{ text }}</div>
      <div class="line"></div>
    </div>
    <div class="others"></div>
  </div>
</template>

<script>
import API from '@/ajax/api.js';
export default {
  data() {
    return {
      imageUrl: '',
      text: ''
    };
  },
  created() {
    this.axios
      .get(API.notRequireAuth.getOneInfo)
      .then(res => {
        // 因为Chrome不支持http请求，所以直接请求图片连接被屏蔽。
        // 又因为one上的图片设置了防外链，所以我们通过反向代理+手动设置host referer来获取图片
        // 所以需要找一个前缀进行代理，所以再加/oneinfo/
        const url = res.data.result.imageUrl.replace('http://image.wufazhuce.com/', '/oneinfo/');
        this.imageUrl = url;
        this.text = res.data.result.text;
      })
      .catch(() => {});
  }
};
</script>

<style lang="scss" scoped>
.one {
  display: flex;
  .main {
    width: $center-width;
    // 实现长宽比
    .image {
      position: relative; /*容器所有子元素需要绝对定位*/
      height: 0; /*容器高度是由padding来控制*/
      padding-top: 66.667%; /* 480 / 720 = 0.66666 */
      margin-top: 5px;
    }
    .image > img {
      /*子元素的宽高和容器一样*/
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      color: $hui-hei;
    }
    .line {
      height: 35px;
      width: 100%;
      background: $hui-hei;
    }
    .text {
      color: $hui-hei;
      display: flex;
      justify-content: center;
      align-items: center;
      // 100vh - header - header和内容的空隙 - 本页面的margin-top - 本页图片高 - 上下黑线 - 更多的占位 - 下方空隙 - footer
      height: calc(100vh - 70px - 10px - 5px - 533px - 70px - 35px - 15px - 60px);
      background: $shen-hui;
    }
  }

  .others {
  }
}
</style>
