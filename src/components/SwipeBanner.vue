<template>
  <div class="banner">
    <swiper :options="swiperOption">
      <swiper-slide><img src="../assets/img/slide.png"></swiper-slide>
      <swiper-slide><img src="../assets/img/slide.png"></swiper-slide>
      <swiper-slide><img src="../assets/img/slide.png"></swiper-slide>
      <swiper-slide><img src="../assets/img/slide.png"></swiper-slide>
      <swiper-slide><img src="../assets/img/slide.png"></swiper-slide>
      <swiper-slide><img src="../assets/img/slide.png"></swiper-slide>
      <swiper-slide><img src="../assets/img/slide.png"></swiper-slide>
      <swiper-slide><img src="../assets/img/slide.png"></swiper-slide>
      <swiper-slide><img src="../assets/img/slide.png"></swiper-slide>
      <swiper-slide><img src="../assets/img/slide.png"></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
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
      }
    }
  },

  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style scoped>
.banner{
  width: 60vw;
}
img{
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;	
}
</style>
