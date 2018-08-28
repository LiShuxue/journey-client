<template>
  <div class="app">
    <main-header></main-header>

    <div class="content">
      <div class="left">
        <nav-bar></nav-bar>
      </div>
      <div class="center">
        <transition name="router-fade" mode="out-in">
          <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
          </keep-alive>
        </transition>
        <transition name="router-fade" mode="out-in">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
        </transition>
      </div>
      <aside class="right">
        <search-box></search-box>
        <keep-alive>
          <category-box></category-box>
        </keep-alive>
        <keep-alive>
          <recommend-box></recommend-box>
        </keep-alive>
      </aside>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import MainHeader from '@/components/header.vue'
import SearchBox from '@/components/search.vue'
import CategoryBox from '@/components/category.vue'
import RecommendBox from '@/components/recommend.vue'
import MainFooter from '@/components/footer.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    MainHeader,
    SearchBox,
    CategoryBox,
    RecommendBox,
    MainFooter
  }
}
</script>

<style lang="scss" scoped>
@import "./assets/fonts/font.css";

.app{
  background-color: $qian-hui;
  font-family: 'DINRegular';
}

.content{
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
  padding-top: 10px;
  margin-top: 60px;
  min-height: 80vh;
}

.left{
  order: 0;
  flex-basis: 160px;
  box-sizing: border-box;
}

.center{
  order: 1;
  flex-basis: 600px;
  box-sizing: border-box;
  margin: 0 10px;
}

.right{
  order: 2;
  flex-basis: 220px;
  box-sizing: border-box;
}

.router-fade-enter{
    opacity: 0;
}
.router-fade-enter-active{
    transition-property: opacity;
    transition-duration: 0.5s;
}
.router-fade-leave-active{
    transition-property: opacity;
    transition-duration: 0.5s;
}
.router-fade-leave-to{
    opacity: 0;
}
</style>
