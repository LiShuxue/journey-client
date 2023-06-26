<template>
  <div class="blog-item" @click="showBlogDetail(blog as BlogType)">
    <div class="blog-image">
      <img :src="blog.image.url" :alt="blog.image.name" />
      <div v-if="blog.isOriginal" class="blog-mark">原创</div>
      <div v-else class="blog-mark">转载</div>
    </div>
    <div class="blog-intro">
      <div class="title">{{ blog.title }}</div>
      <div class="sub-title">{{ blog.subTitle }}</div>
      <div class="tool">
        <div class="time-zone">
          <span class="iconfont icon-clock"></span>
          <span class="content">{{ displayPublishTime }}</span>
        </div>
        <span class="iconfont icon-eye"></span><span class="content">{{ blog.see }}</span>
        <!-- Sample list not include comments -->
        <!-- <div @click.stop="clickComments" style="display: inline"><span class="iconfont icon-comment"></span><span class="content">{{blog.comments.length}}</span></div> -->
        <div @click.stop="clickLike" style="display: inline" v-bind:class="[{ liked: isLiked }]">
          <span class="iconfont icon-like"></span><span class="content">{{ like }}</span>
        </div>
        <div @click.stop="clickCategory" style="display: inline">
          <span class="iconfont icon-list"></span><span class="content">{{ blog.category }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import API from '@/ajax/api.js';
import { useBlogStore } from '../store';

export default {
  setup() {
    const store = useBlogStore();
    return {
      store,
    };
  },
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isLiked: false,
      like: 0,
    };
  },
  computed: {
    displayPublishTime() {
      return dayjs((this.blog as BlogType).publishTime).format('YYYY-MM-DD');
    },
  },
  created() {
    // 将点赞过的文章显示出来
    if (
      Object.keys(localStorage).includes(this.blog._id) &&
      localStorage.getItem(this.blog._id) === 'true'
    ) {
      this.isLiked = true;
    }
    this.like = this.blog.like;
  },
  methods: {
    showBlogDetail(blog: BlogType) {
      if (this.store.isMenuOpen) {
        this.store.openOrCloseMenuMutation(false);
      }
      this.store.chooseBlogAction(blog).then(() => {
        if (this.$route.name !== 'blog') {
          this.$router.push(`/blog/${blog._id}`);
        }
      });
    },

    clickLike() {
      // 点赞后存在本地，下次进来的时候显示点赞过
      if (!this.isLiked) {
        this.isLiked = true;
        localStorage.setItem(this.blog._id, `${this.isLiked}`);
      } else {
        this.isLiked = false;
        localStorage.removeItem(this.blog._id);
      }

      (this as any).axios
        .post(API.likeBlog, {
          id: this.blog._id,
          isLiked: this.isLiked,
        })
        .then(() => {
          // 刷新页面显示
          if (this.isLiked) {
            this.like++;
          } else {
            this.like--;
          }
        })
        .catch((err: any) => {
          (this as any).handleError(err);
        });
    },
    clickCategory() {
      this.$router.push('/category');
    },
  },
};
</script>

<style lang="scss" scoped>
.blog-item {
  display: flex;
  box-sizing: border-box;
  margin-top: 15px;
  padding: 7px;
  background: $hui-bai;
  * {
    cursor: pointer;
  }
  &:hover {
    background: $shen-hui;
    img {
      transform: scale(1.1);
      transition: all 0.25s;
    }
  }
}

.blog-image {
  position: relative;
  overflow: hidden;
  flex-basis: $blog-item-image-width;
  height: $blog-item-height;
  margin-right: 15px;
  box-sizing: border-box;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover; // 通过这个属性实现background-size:cover的效果
  }
  .blog-mark {
    position: absolute;
    display: inline-block;
    text-align: center;
    top: 0;
    left: 0;
    transform: rotate(-45deg) translate(-7px, -20px);
    transform-origin: center;
    color: $hui-bai;
    background: $qian-lan;
    font-size: $mediu-small-size;
    width: 50px;
    padding-top: 20px;
    opacity: 0.7;
  }
}

.blog-intro {
  position: relative;
  flex-basis: $blog-item-intro-width;
  height: $blog-item-height;
  color: $hui-hei;
  padding: 0 10px;
  box-sizing: border-box;
  .title {
    margin-top: 5px;
    font-weight: bold;
    font-size: $mediu-large-size;
  }

  .sub-title {
    margin-top: 10px;
    font-size: $mediu-size;
  }

  .tool {
    position: absolute;
    bottom: 10px;

    .time-zone {
      display: inline;
    }

    span {
      display: inline-block;
      margin-right: 5px;
      font-size: $mediu-small-size;
    }

    .content {
      margin-right: 20px;
    }

    .liked {
      color: #2192f5;
    }
  }
}

.is-mobile .blog-list .blog-item {
  .time-zone {
    display: none;
  }
  .content {
    margin-right: 17px;
  }
}
</style>
