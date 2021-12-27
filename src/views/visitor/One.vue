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
    <div class="others">
      <div class="day">
        <span>{{ displayDate }}</span>
        <span>{{ displayDay }}</span>
      </div>
      <div class="time">{{ displayTime }}</div>
      <div v-if="Object.keys(address).length > 0" class="address">{{ `${address.city} ${address.district}` }}</div>
      <div v-if="wea.observe && Object.keys(wea.observe).length > 0" class="wea">
        今日天气：{{ wea.observe.weather }}
      </div>
      <div v-if="wea.observe && Object.keys(wea.observe).length > 0" class="temp">
        {{ wea.observe.degree }}<span>℃</span>
      </div>
      <div v-if="wea.observe && Object.keys(wea.observe).length > 0" class="win">
        {{ displayWind }}： {{ wea.observe.wind_power }}级
      </div>
      <div v-if="wea.tips && wea.tips.observe" class="tips">{{ wea.tips.observe[0] }}</div>
    </div>
  </div>
</template>

<script>
import API from '@/ajax/api.js';
import dayjs from 'dayjs';

export default {
  data() {
    return {
      imageUrl: '',
      text: '',
      date: new Date(),
      timer: null,
      wea: {},
      address: {}
    };
  },

  computed: {
    displayDate() {
      return dayjs(this.date).format('YYYY年MM月DD日');
    },
    displayTime() {
      return dayjs(this.date).format('HH:mm:ss');
    },
    displayDay() {
      const dayMap = {
        0: '星期天',
        1: '星期一',
        2: '星期二',
        3: '星期三',
        4: '星期四',
        5: '星期五',
        6: '星期六'
      };
      const day = dayjs(this.date).format('d');
      return dayMap[day];
    },
    displayWind() {
      const windMap = {
        1: '东北风',
        2: '东风',
        3: '东南风',
        4: '南风',
        5: '西南风',
        6: '西风',
        7: '西北风',
        8: '北风'
      };
      return windMap[this.wea.observe?.wind_direction];
    }
  },

  created() {
    this.axios
      .get(API.notRequireAuth.getHomeInfo)
      .then(res => {
        // 因为Chrome不支持http请求，所以直接请求图片连接被屏蔽。
        // 又因为one上的图片设置了防外链，所以我们通过反向代理+手动设置host referer来获取图片
        // 所以需要找一个前缀进行代理，所以再加/oneinfo/
        const url = res.data.one.imageUrl.replace('http://image.wufazhuce.com/', '/oneinfo/');
        this.imageUrl = url;
        this.text = res.data.one.text;
        this.wea = res.data.wea;
        this.address = res.data.address;
      })
      .catch(() => {});
  },

  mounted() {
    const _this = this;
    this.timer = setInterval(() => {
      _this.date = new Date();
    }, 1000);
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 页面销毁前，清除定时器
    }
  }
};
</script>

<style lang="scss" scoped>
.one {
  display: flex;
  width: $center-right;

  .main {
    width: $center-width;
    margin-right: 10px;
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
      padding: 0 12px;
      color: $hui-hei;
      display: flex;
      justify-content: center;
      align-items: center;
      // 100vh - header - header和内容的空隙 - 本页面的margin-top - 本页图片高 - 上下黑线 - 更多的占位 - 下方空隙 - footer
      height: calc(100vh - 70px - 10px - 5px - 523px - 70px - 35px - 15px - 60px);
      background: $shen-hui;
      line-height: 1.5;
    }
  }

  .others {
    width: $right-width;
    padding: 10px;
    background: $hui-bai;
    border-radius: 5%;
    color: $hui-hei;
    display: flex;
    flex-direction: column;
    align-items: center;

    .day {
      span {
        margin-right: 10px;
      }
    }

    .time {
      font-size: 25px;
    }

    .address {
      margin-top: 20px;
    }

    .tips,
    .wea,
    .win,
    .day {
      margin: 20px 0 20px 0;
    }

    .temp {
      font-size: 40px;
      span {
        position: relative;
        top: -20px;
        font-size: 12px;
      }
    }
  }
}

.is-mobile {
  .one {
    display: flex;
    flex-direction: column;
  }
  .main {
    order: 2;
    width: calc(100vw - 20px);
    .image {
      margin-top: 0;
    }
    .line {
      height: 10px;
    }
    .text {
      height: 100px;
    }
  }

  .others {
    order: 1;
    width: calc(100vw - 40px);

    .day,
    .time {
      display: none;
    }

    .wea,
    .win {
      margin: 15px 0 15px 0;
    }
  }
}
</style>
