<template>
  <div class="blog-list">
    <blog-item v-for="(item, index) in blogList" :blog="item" :key="index"></blog-item>
    <div class="more" @click="getMore" :style="cursor">{{ msg }}</div>
  </div>
</template>

<script>
import BlogItem from '@/components/BlogItem.vue';
import { mapState } from 'vuex';
import API from '@/ajax/api.js';

export default {
  data() {
    return {
      filterBlogList: [],
      msg: '',
      blogList: [],
      startArrIndex: 0,
      endArrIndex: 6,
      getMoreList: 6,
      canGetMore: true,
      cursor: 'cursor: pointer;',
      timer: null
    };
  },

  computed: {
    ...mapState({
      allBlogList: 'blogList'
    })
  },

  watch: {
    $route() {
      this.setFilterBlogList();
      this.setBlogList();
    }
  },

  components: {
    BlogItem
  },

  async created() {
    if (!this.allBlogList || this.allBlogList.length <= 0) {
      const response = await this.axios.get(API.blogList);
      const blogList = response.data.blogList;
      this.$store.commit('saveBlogListMutation', blogList);
    }

    this.setFilterBlogList();
    this.setBlogList();
  },

  methods: {
    setFilterBlogList() {
      if (this.$route.query.keywords !== undefined) {
        let keywords = this.$route.query.keywords;
        let blogListWithKeywords = this.allBlogList.filter(value => {
          // tags中包含 或者 category中包含 或者 title中包含 或者 subTitle中包含
          return (
            value.tags
              .join('')
              .toUpperCase()
              .indexOf(keywords.toUpperCase()) > -1 ||
            value.category.toUpperCase().indexOf(keywords.toUpperCase()) > -1 ||
            value.title.toUpperCase().indexOf(keywords.toUpperCase()) > -1 ||
            value.subTitle.toUpperCase().indexOf(keywords.toUpperCase()) > -1
          );
        });
        this.filterBlogList = blogListWithKeywords;
      }

      if (this.$route.query.tag !== undefined) {
        let tag = this.$route.query.tag;
        let blogListWithSameTag = this.allBlogList.filter(value => {
          return value.tags.includes(tag);
        });
        this.filterBlogList = blogListWithSameTag;
      }

      if (this.$route.query.category !== undefined) {
        let category = this.$route.query.category;
        let blogListWithSameCategory = this.allBlogList.filter(value => {
          return value.category === category;
        });
        this.filterBlogList = blogListWithSameCategory;
      }
    },

    setBlogList() {
      this.blogList = this.filterBlogList.slice(this.startArrIndex, this.endArrIndex);
      if (this.blogList.length < this.filterBlogList.length) {
        this.msg = '点击加载更多';
        this.cursor = 'cursor: pointer;';
        this.canGetMore = true;
      } else {
        this.msg = '没有更多了';
        this.cursor = '';
        this.canGetMore = false;
      }
    },

    getMore() {
      if (this.canGetMore) {
        this.msg = 'loading...';
        this.cursor = '';
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.startArrIndex = this.startArrIndex + this.getMoreList;
          this.endArrIndex = this.endArrIndex + this.getMoreList;
          let moreList = this.filterBlogList.slice(this.startArrIndex, this.endArrIndex);
          let newList = [...this.blogList, ...moreList];
          this.blogList = newList;
          this.msg = '点击加载更多';
          this.cursor = 'cursor: pointer;';
          if (this.endArrIndex >= this.filterBlogList.length) {
            this.msg = '没有更多了';
            this.cursor = '';
            this.canGetMore = false;
          }
        }, 1000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.blog-list {
  box-sizing: border-box;
}
.blog-item:first-child {
  margin-top: 0px;
}
.more {
  display: inline-block;
  text-align: center;
  font-size: $mediu-size;
  line-height: $mediu-size;
  color: $hui-hei;
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  background: $shen-hui;
}
</style>
