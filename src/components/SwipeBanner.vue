<template>
  <div class="banner" :style="widthStyle">
    <swiper :options="swiperOption">
      <swiper-slide><img :src="slideImage" :style="widthStyle"></swiper-slide>
      <swiper-slide><img :src="slideImage" :style="widthStyle"></swiper-slide>
      <swiper-slide><img :src="slideImage" :style="widthStyle"></swiper-slide>
      <swiper-slide><img :src="slideImage" :style="widthStyle"></swiper-slide>
      <swiper-slide><img :src="slideImage" :style="widthStyle"></swiper-slide>
      <swiper-slide><img :src="slideImage" :style="widthStyle"></swiper-slide>
      <swiper-slide><img :src="slideImage" :style="widthStyle"></swiper-slide>
      <swiper-slide><img :src="slideImage" :style="widthStyle"></swiper-slide>
      <swiper-slide><img :src="slideImage" :style="widthStyle"></swiper-slide>
      <swiper-slide><img :src="slideImage" :style="widthStyle"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import mockdata from '../../mock/mock'
export default {
  data () {
    return {
      swiperOption: {
        spaceBetween: 20, // 切换图片时中间的白条
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      widthStyle: '',
      slideImage: mockdata.slideImage
    }
  },

  components: {
    swiper,
    swiperSlide
  },

  mounted () {
    // 首次渲染之后设置swiper宽度
    this.setStyle(this)
    const _self = this
    let timer = null
    // 屏幕宽度变化时重新设置swiper宽度
    window.onresize = () => {
      if (timer !== null) { // 使用函数防抖原理，防止频繁触发window resize事件
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        _self.setStyle(_self)
      }, 200)
    }
  },

  methods: {
    setStyle (self) {
      let imgWidth
      if (document.body.clientWidth >= 1000) {
        imgWidth = '600px'
      } else {
        imgWidth = 0.6 * document.body.clientWidth + 'px'
      }
      self.widthStyle = `width: ${imgWidth}`
    }
  }
}
</script>

<style scoped>
.banner{
  box-sizing: border-box;
}
</style>
