<template>
  <div class="banner" :style="sizeStyle">
    <swiper
      :modules="modules"
      :space-between="20"
      :pagination="{ clickable: true }"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
      }"
    >
      <swiper-slide v-for="(blog, index) in store.newBlogList" :key="index">
        <img
          :src="blog.image.url"
          :alt="blog.image.name"
          :style="sizeStyle"
          @click="showBlogDetail(blog)"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script lang="ts">
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { isMobile } from '../utils/device';
import { useBlogStore } from '../store';

export default {
  setup() {
    const store = useBlogStore();
    return {
      store,
    };
  },
  data() {
    return {
      sizeStyle: '',
      modules: [Pagination, Autoplay],
    };
  },

  components: {
    Swiper,
    SwiperSlide,
  },

  mounted() {
    // 首次渲染之后设置swiper宽度
    this.setStyle(this);
    const _self = this;
    let timer: number | null = null;
    // 屏幕宽度变化时重新设置swiper宽度
    window.onresize = () => {
      if (timer !== null) {
        // 使用函数防抖原理，防止频繁触发window resize事件
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        _self.setStyle(_self);
      }, 200);
    };
  },

  methods: {
    setStyle(self: any) {
      let imgWidth;
      let imgHeight;
      if (isMobile) {
        imgWidth = document.body.clientWidth - 20;
        imgHeight = (300 / 850) * imgWidth;
      } else {
        imgWidth = 850;
        imgHeight = 300;
      }
      self.sizeStyle = `width: ${imgWidth}px; height: ${imgHeight}px`;
    },
    showBlogDetail(blog: BlogType) {
      if (this.store.isMenuOpen) {
        this.store.openOrCloseMenuMutation(false);
      }
      this.store.chooseBlogAction(blog);
      if (this.$route.name !== 'blog') {
        this.$router.push(`/blog/${blog._id}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  box-sizing: border-box;
}

.swiper-slide img {
  object-fit: cover;
  &:hover {
    transform: scale(1.2);
    transition: all 1s;
  }
}
</style>
