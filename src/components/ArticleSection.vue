<template>
  <div :class="['article-section-list-wrapper', { 'sticky-top': stickyTop }]" ref="stickyWrapper">
    <p class="title">
      <span class="iconfont icon-top-ten"></span>
      <span>文章目录</span>
    </p>
    <div class="title-list">
      <MdCatalog
        editorId="my-editorid"
        :scrollElement="scrollElement"
        :offsetTop="80"
        :scrollElementOffsetTop="80"
        :onClick="onCatalogClick"
      />
    </div>
  </div>
</template>

<script>
import { MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { useBlogStore } from '../store';
import debounce from 'lodash-es/debounce';

export default {
  setup() {
    const store = useBlogStore();
    return {
      store,
    };
  },
  data() {
    return {
      offsetTop: 0,
      stickyTop: false,
      scrollElement: document.documentElement,
    };
  },

  components: {
    MdCatalog,
  },

  mounted() {
    setTimeout(() => {
      // 设置元素渲染之后的距离文档顶端的距离
      this.offsetTop = this.$refs.stickyWrapper?.offsetTop || 0;
      // 设置滚动事件
      window.addEventListener('scroll', debounce(this.handleScroll.bind(this), 300));
    }, 1000);
  },

  methods: {
    handleScroll() {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop >= this.offsetTop - 70) {
        this.stickyTop = true;
      } else {
        this.stickyTop = false;
      }
    },

    onCatalogClick() {
      if (this.store.isDirectoryOpen) {
        this.store.openOrCloseDirectoryMutation(false);
      } else {
        this.store.openOrCloseDirectoryMutation(true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.sticky-top {
  position: fixed;
  /* position: sticky; 未来可以用这个属性值*/
  top: 70px;
  margin-top: 0 !important;
  width: $right-width;
  box-sizing: border-box;
}
.article-section-list-wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px;
  background: $hui-bai;
  border-radius: 5%;
  color: $hui-hei;
  max-height: calc(100vh - 70px - 75px - 45px);
  overflow: auto;
}

.title {
  padding: 5px 10px 6px 0;
  border-bottom: 1px dashed $shen-hui;
  font-size: $large-size;

  span {
    margin-right: 5px;
  }
}

.title-list {
  :deep(.md-editor-catalog-active > span) {
    color: #2192f5;
  }
  :deep(.md-editor-catalog-link > span):hover {
    color: #2192f5;
  }
}

.is-mobile .article-section-list-wrapper {
  margin-top: 0;
}
</style>
