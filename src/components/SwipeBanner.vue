<template>
  <div class="banner" :style="sizeStyle"  @mouseenter="enter()" @mouseleave="leave()">
    <swiper :options="swiperOption" ref="mySwiper">
      <swiper-slide v-for="(blog, index) in hotBlogList" :key="index">
        <img :src="blog.image.url" :alt="blog.image.name" :style="sizeStyle" @click="showBlogDetail(blog)">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      swiperOption: {
        spaceBetween: 20, // 切换图片时中间的白条
        centeredSlides: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      },
      sizeStyle: ''
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.swiper
    },
    ...mapGetters([
      'hotBlogList'
    ])
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
      let imgHeight
      if (this.$store.state.isMobile) {
        imgWidth = document.body.clientWidth - 20
        imgHeight = 250 / 700 * imgWidth
      } else {
        imgWidth = 700
        imgHeight = 250
      }
      self.sizeStyle = `width: ${imgWidth}px; height: ${imgHeight}px`
    },
    enter () {
      // this.swiper.autoplay.pause()
    },
    leave () {
      // this.swiper.autoplay.run()
    },
    showBlogDetail (blog) {
      if(this.$store.state.isMenuOpen){
        this.$store.commit('openOrCloseMenuMutation', false);
      }
      this.$store.dispatch('chooseBlogAction', blog).then(() => {
        if (this.$route.name !== 'blog') {
          this.$router.push('/blog')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.banner{
  box-sizing: border-box;
}

.swiper-slide img{
  object-fit: cover;
  &:hover{
    transform: scale(1.2);
    transition: all 1s;
  }
}
</style>
