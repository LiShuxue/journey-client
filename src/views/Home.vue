<template>
  <div class="home">
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
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data() {
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

<style lang="scss" scoped>
.banner{
  width: 60vw;
  height: 25vh;
}
</style>