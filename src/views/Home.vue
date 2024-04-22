<template>
  <div class="home">
    <swipe-banner></swipe-banner>
    <div class="blog-list" v-if="blogList.length > 0">
      <blog-item v-for="(item, index) in blogList" :blog="item" :key="index"></blog-item>
    </div>
    <div class="more" @click="getMore" :style="cursor">{{ msg }}</div>
  </div>
</template>

<script lang="ts">
import SwipeBanner from '@/components/SwipeBanner.vue';
import BlogItem from '@/components/BlogItem.vue';
import API from '@/ajax/api.js';
import { useBlogStore } from '../store';

const mockdata: BlogType[] = [
  {
    _id: '1',
    title: '维护中',
    subTitle: '维护中，等等再来吧...',
    image: {
      name: '维护中',
      url: 'https://www.test.com/down.png',
    },
    htmlContent: '<p>维护中，等等再来吧...</p>',
    isOriginal: true,
    publishTime: Date.now(),
    updateTime: Date.now(),
    see: 100,
    like: 100,
    category: '维护',
    tags: ['维护'],
    comments: [
      {
        date: Date.now(),
        content: '维护中',
        arthur: '维护中',
      },
    ],
  },
];

export default {
  setup() {
    const store = useBlogStore();
    return {
      store,
    };
  },
  data() {
    return {
      msg: '',
      blogList: [] as BlogType[],
      allBlogList: [] as BlogType[],
      startArrIndex: 0,
      endArrIndex: 6,
      getMoreList: 6,
      canGetMore: true,
      cursor: 'cursor: pointer;',
      timer: null as number | null,
    };
  },

  created() {
    (this as any).axios
      .get(API.blogList)
      .then((response: any) => {
        if (response && response.length > 0) {
          this.allBlogList = response;
          this.store.saveBlogListMutation(this.allBlogList);
          this.blogList = this.allBlogList.slice(this.startArrIndex, this.endArrIndex);
          if (this.blogList.length < this.allBlogList.length) {
            this.msg = '点击加载更多';
            this.cursor = 'cursor: pointer;';
            this.canGetMore = true;
          } else {
            this.msg = '没有更多了';
            this.cursor = '';
            this.canGetMore = false;
          }
        } else {
          this.store.saveBlogListMutation(mockdata);
          this.allBlogList = mockdata;
          this.blogList = this.allBlogList.slice(this.startArrIndex, this.endArrIndex);
          this.msg = '没有更多了';
          this.cursor = '';
          this.canGetMore = false;
        }
      })
      .catch((err: any) => {
        (this as any).handleError(err);
        this.store.saveBlogListMutation(mockdata);
        this.allBlogList = mockdata;

        this.blogList = this.allBlogList.slice(this.startArrIndex, this.endArrIndex);
        this.msg = '没有更多了';
        this.cursor = '';
        this.canGetMore = false;
      });
  },

  components: {
    SwipeBanner,
    BlogItem,
  },

  mounted() {
    console.clear();
    console.log('%c'.concat('这是一个彩蛋'), 'color:#666;font-size:3em');
  },

  methods: {
    getMore() {
      if (this.canGetMore) {
        this.msg = 'loading...';
        this.cursor = '';
        // 函数防抖
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          this.startArrIndex = this.startArrIndex + this.getMoreList;
          this.endArrIndex = this.endArrIndex + this.getMoreList;
          let moreList = this.allBlogList.slice(this.startArrIndex, this.endArrIndex);
          let newList = [...this.blogList, ...moreList];
          this.blogList = newList;
          this.msg = '点击加载更多';
          this.cursor = 'cursor: pointer;';
          if (this.endArrIndex >= this.allBlogList.length) {
            this.msg = '没有更多了';
            this.cursor = '';
            this.canGetMore = false;
          }
        }, 1000);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  box-sizing: border-box;
}

.more {
  display: inline-block;
  text-align: center;
  font-size: $mediu-size;
  height: 35px;
  line-height: 35px;
  color: $hui-hei;
  width: 100%;
  margin-top: 10px;
  background: $shen-hui;
}
</style>
