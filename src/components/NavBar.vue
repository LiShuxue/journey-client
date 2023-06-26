<template>
  <nav class="nav">
    <div v-if="isMobile" class="logo"></div>
    <div v-for="(item, index) in navList" :key="index">
      <router-link v-bind:to="item.path" @click="closeMenu">
        <div class="nav-item">
          <span class="nav-icon iconfont" v-bind:class="item.style"></span>
          <span class="nav-title">{{ item.name }}</span>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
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
      isMobile,
      navList: [
        { path: '/one', name: '发现', style: 'icon-eye' },
        { path: '/home', name: '博客', style: 'icon-home' },
        { path: '/category', name: '分类', style: 'icon-list' },
        { path: '/about', name: '关于', style: 'icon-user' },
      ],
    };
  },
  methods: {
    closeMenu() {
      if (this.store.isMenuOpen) {
        this.store.openOrCloseMenuMutation(false);
      }
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  top: 70px;
  width: $left-width;
  height: calc(100vh - 70px - 75px - 45px);
  color: $hui-hei;
  background: $hui-bai;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
  opacity: 0.8;
  font-size: $large-size;
}

.logo {
  position: relative;
  top: 12px;
  left: -19px;
  height: 20px;
  box-sizing: border-box;
  margin-bottom: 35px;
  background: url('../assets/img/logo.png') no-repeat;
  background-size: contain;
  background-position: center;
}

.nav-item {
  color: $hui-hei;
  padding: 10px 10px 10px 10px;
  margin-bottom: 10px;
  border-radius: 20%;
  &:hover {
    background: $shen-hui;
  }
}
.nav-icon {
  margin-right: 15px;
}
.nav-title {
  font-weight: bold;
}

.router-link-exact-active {
  & .nav-item {
    background: $shen-hui;
    color: $qian-lan;
  }
}

a {
  text-decoration: none;
  color: $hui-hei;
  cursor: pointer;
  outline: none;
}
.is-mobile .nav {
  top: 0;
  height: 100vh;
  left: -$left-width;
  border-radius: 0;
  transition: left 0.5s;
}
.is-mobile .menu-open .nav {
  left: 0;
}
</style>
