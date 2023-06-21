<template>
  <div class="blog">
    <div class="blog-wrapper" v-if="store.chooseBlog && Object.keys(store.chooseBlog).length > 0">
      <div v-if="store.chooseBlog.isOriginal" class="blog-mark">原创</div>
      <div v-else class="blog-mark">转载</div>
      <h1 class="blog-title">{{ store.chooseBlog.title }}</h1>
      <div class="blog-img">
        <img :src="store.chooseBlog.image.url" :alt="store.chooseBlog.image.name" />
      </div>
      <div class="blog-content">
        <MdPreview
          :modelValue="store.chooseBlog.markdownContent"
          previewTheme="github"
          codeTheme="github"
        />
      </div>
    </div>

    <div class="pre-next">
      <p class="item" v-if="preBlog" @click.stop="clickPreBlog">上一篇：{{ preBlog.title }}</p>
      <p class="item" v-if="nextBlog" @click.stop="clickNextBlog">下一篇：{{ nextBlog.title }}</p>
    </div>

    <div class="tool-wrapper" v-if="store.chooseBlog && Object.keys(store.chooseBlog).length > 0">
      <div @click.stop="backToTop" class="iconfont icon-top back-to-top"></div>

      <div class="time-info">
        本文于
        <span
          ><u>{{ displayPublishTime }}</u></span
        >
        日发表在
        <span @click.stop="clickCategory(store.chooseBlog.category)" style="cursor: pointer"
          ><u
            ><b>{{ store.chooseBlog.category }}</b></u
          ></span
        >
        分类下
        <span v-if="store.chooseBlog.updateTime !== store.chooseBlog.publishTime">
          ，修改于
          <u>{{ displayUpdateTime }}</u>
          日
        </span>
      </div>

      <div class="tags">
        相关标签：
        <span
          class="tag-item"
          v-for="(item, index) in store.chooseBlog.tags"
          :key="index"
          @click="clickTag(item)"
        >
          {{ item }}
        </span>
      </div>

      <div class="see-info">
        该文章已被阅读
        <span>
          <u>{{ store.chooseBlog.see }}</u>
        </span>
        次，共有
        <span>
          <u>{{ store.chooseBlog.like }}</u>
        </span>
        人喜欢！
      </div>

      <div class="dianzan">
        <span v-if="!isLiked" class="msg1">如果您觉得不错可以为我点赞哦！</span>
        <span v-else class="msg2">很高兴您能喜欢该文章！</span>
        <span
          @click.stop="clickLike"
          class="iconfont icon-like like"
          v-bind:class="[{ liked: isLiked }]"
        ></span>
        <span v-bind:class="[{ liked: isLiked }]"> {{ store.chooseBlog.like }}</span>
      </div>
    </div>

    <article-comments
      v-if="store.chooseBlog && Object.keys(store.chooseBlog).length > 0"
      @refreshBlogFromChild="refreshBlog"
    ></article-comments>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import API from '@/ajax/api.js';
import ArticleComments from '@/components/ArticleComments/index.vue';
import { useBlogStore } from '../store';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

export default {
  setup() {
    const store = useBlogStore();
    return {
      store,
    };
  },
  components: {
    ArticleComments,
    MdPreview,
  },

  data() {
    return {
      isLiked: false,
      preBlog: null,
      nextBlog: null,
    };
  },

  computed: {
    displayPublishTime() {
      return dayjs(this.store.chooseBlog.publishTime).format('YYYY-MM-DD');
    },
    displayUpdateTime() {
      return dayjs(this.store.chooseBlog.updateTime).format('YYYY-MM-DD');
    },
  },

  watch: {
    'store.chooseBlog': {
      handler() {
        this.setLike();
        this.getLastNextBlog();
      },
    },

    $route(to) {
      if (to.params.id) {
        this.axios.get(`${API.blogDetail}?id=${to.params.id}`).then((response) => {
          const blog = response.data.blog;
          window.scrollTo(0, 0);
          this.store.chooseBlogMutation(blog);
        });
      }
    },
  },

  async created() {
    if (!this.store.blogList || this.store.blogList.length <= 0) {
      await this.refreshBlogList();
    }
    if (!this.store.chooseBlog || !this.store.chooseBlog._id) {
      await this.refreshBlog();
    }

    this.setLike();
    this.getLastNextBlog();
  },

  methods: {
    async refreshBlogList() {
      const response = await this.axios.get(API.blogList);
      const list = response.data.blogList;
      this.store.saveBlogListMutation(list);
    },

    async refreshBlog() {
      let id = this.$route.params.id;
      const response = await this.axios.get(`${API.blogDetail}?id=${id}`);
      const blog = response.data.blog;
      this.store.chooseBlogMutation(blog);
    },

    setLike() {
      this.isLiked = false;
      if (
        Object.keys(localStorage).includes(this.store.chooseBlog._id) &&
        localStorage.getItem(this.store.chooseBlog._id) === 'true'
      ) {
        this.isLiked = true;
      }
    },

    backToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    },

    clickLike() {
      // 点赞后存在本地，下次进来的时候显示点赞过
      if (!this.isLiked) {
        this.isLiked = true;
        localStorage.setItem(this.store.chooseBlog._id, `${this.isLiked}`);
      } else {
        this.isLiked = false;
        localStorage.removeItem(this.store.chooseBlog._id);
      }

      this.axios
        .post(API.likeBlog, {
          id: this.store.chooseBlog._id,
          isLiked: this.isLiked,
        })
        .then(() => {
          // 刷新页面显示
          if (this.isLiked) {
            this.store.chooseBlog.like++;
          } else {
            this.store.chooseBlog.like--;
          }
        })
        .catch((err) => {
          this.handleError(err);
        });
    },
    clickCategory(category) {
      this.$router.push({
        name: 'bloglist',
        query: {
          category,
        },
      });
    },
    clickTag(tag) {
      this.$router.push({
        name: 'bloglist',
        query: {
          tag,
        },
      });
    },

    getLastNextBlog() {
      this.preBlog = null;
      this.nextBlog = null;

      this.getBlogFromCategoryList();
      this.getBlogFromAll();
    },

    getBlogFromCategoryList() {
      let blogListWithSameCategory = this.store.blogList.filter((value) => {
        return value.category === this.store.chooseBlog.category;
      });
      let searchList = blogListWithSameCategory;
      let currentIndex = 0;
      searchList.forEach((value, index) => {
        if (value._id === this.store.chooseBlog._id) {
          currentIndex = index;
        }
      });

      if (this.nextBlog === null && currentIndex - 1 >= 0) {
        this.nextBlog = searchList[currentIndex - 1];
      }
      if (this.preBlog === null && currentIndex + 1 < searchList.length) {
        this.preBlog = searchList[currentIndex + 1];
      }
    },
    getBlogFromAll() {
      let searchList = this.store.blogList;
      let currentIndex = 0;
      searchList.forEach((value, index) => {
        if (value._id === this.store.chooseBlog._id) {
          currentIndex = index;
        }
      });

      if (this.nextBlog === null && currentIndex - 1 >= 0) {
        this.nextBlog = searchList[currentIndex - 1];
      }
      if (this.preBlog === null && currentIndex + 1 < searchList.length) {
        this.preBlog = searchList[currentIndex + 1];
      }
    },

    clickPreBlog() {
      this.$router.push(`/blog/${this.preBlog._id}`);
    },

    clickNextBlog() {
      this.$router.push(`/blog/${this.nextBlog._id}`);
    },
  },
};
</script>
<style lang="scss">
.blog {
  .blog-wrapper {
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 0 20px 40px 20px;
    background: $hui-bai;

    .blog-mark {
      position: absolute;
      display: inline-block;
      text-align: center;
      top: 0;
      left: 0;
      transform: rotate(-45deg) translate(-8px, -22px);
      transform-origin: center;
      color: $hui-bai;
      background: $qian-lan;
      font-size: $mediu-small-size;
      width: 60px;
      padding: 23px 0 1px 0;
      opacity: 0.7;
    }

    .blog-title {
      margin: 25px 0 30px 0;
      display: flex;
      justify-content: center;
    }

    .blog-content {
    }

    /*下面的方法实现长宽比*/
    .blog-img {
      position: relative;
      /*容器所有子元素需要绝对定位*/
      height: 0;
      /*容器高度是由padding来控制*/
      padding-top: 37.5%;
      /* 300 / 800 = 0.375 */
      margin-bottom: 15px;
      border: 5px solid $shen-hui;
      border-radius: 5px;
    }

    .blog-img > img {
      /*子元素的宽高和容器一样*/
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.9;

      &:hover {
        opacity: 1;
        transition: all 0.25s;
      }
    }
  }

  .tool-wrapper {
    margin-top: 20px;
    padding: 20px;
    background: $hui-bai;
    border-radius: 10px;
    color: $hui-hei;

    .back-to-top {
      cursor: pointer;
      border: 1px solid black;
      padding: 5px;
      border-radius: 50%;
      position: fixed;
      bottom: 140px;
      right: calc(50vw - 400px + 40px);
      z-index: 1000;
    }

    .time-info,
    .dianzan,
    .see-info,
    .tags {
      margin-bottom: 20px;
    }

    .time-info,
    .dianzan,
    .see-info {
      line-height: 25px;
    }

    .tags {
      line-height: 32px;

      .tag-item {
        cursor: pointer;
        padding: 5px;
        background: $shen-hui;
        border-radius: 10px;
        margin-right: 10px;
      }
    }

    .dianzan {
      .like {
        cursor: pointer;
        font-size: 25px;
      }

      .liked {
        color: #2192f5;
      }

      .msg1,
      .msg2 {
        margin-right: 5px;
      }
    }
  }

  .pre-next {
    margin-top: 20px;
    padding: 5px 20px;
    background: $hui-bai;
    border-radius: 10px;
    color: $hui-hei;

    .item {
      color: #2192f5;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

.is-mobile .blog-wrapper .markdown-body {
  padding: 15px 5px 0 5px;
}

.is-mobile .blog-wrapper {
  padding: 0 10px 20px 10px;
}

.is-mobile .back-to-top {
  bottom: 85px !important;
  right: 20px !important;
}
</style>
