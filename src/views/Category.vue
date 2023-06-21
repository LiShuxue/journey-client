<template>
  <div class="category">
    <h3>知识，要靠一点一滴的积累</h3>
    <div :class="{ 'category-list': !isMobile }">
      <p
        v-for="(category, index) in store.categoryList"
        :key="index"
        @click="clickCategory(category)"
      >
        <span class="icon iconfont icon-category"></span>
        <span>{{ category }}</span>
        <span>
          {{
            store.blogList.filter((value) => {
              return value.category === category;
            }).length
          }}
        </span>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import API from '@/ajax/api.js';
import { useBlogStore } from '../store';
import { isMobile } from '../utils/device';

export default {
  setup() {
    const store = useBlogStore();
    return {
      store,
      isMobile,
    };
  },

  async created() {
    if (!this.store.blogList || this.store.blogList.length <= 0) {
      const response = await (this as any).axios.get(API.blogList);
      const list = response.data.blogList;
      this.store.saveBlogListMutation(list);
    }
  },

  methods: {
    clickCategory(category: string) {
      this.$router.push({
        name: 'bloglist',
        query: {
          category,
        },
      });
    },
  },
};
</script>

<style lang="scss">
.category {
  position: fixed;
  overflow: scroll;
  width: $center-width;
  /*总高度 - 内容padding-top - more button margin-top - more button height - more button margin-bottom - footer height*/
  height: calc(100vh - 70px - 10px - 36px - 15px - 60px);
  box-sizing: border-box;
  border-radius: 10px;
  padding: 20px;
  background: $hui-bai;
  color: $hui-hei;

  p {
    display: flex;
    align-items: center;
    width: 195px;
    background: $qian-hui;
    padding: 5px;
    margin: 0 10px 10px 0;
    border-radius: 10px;
    cursor: pointer;
    font-size: $mediu-size;
    &:hover {
      background: $shen-hui;
    }
    .icon {
      width: 20px;
      margin-right: 5px;
    }
    :nth-child(2) {
      margin-right: 5px;
    }
  }
  .category-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: 300px;
  }
}

.is-mobile .category {
  position: relative;
  width: auto;
  height: auto;
  padding: 10px 10px 10px 15px;
}
</style>
