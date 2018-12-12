<template>
  <div class="wrapper" v-bind:class="{'menu-open': this.$store.state.isMenuOpen}">
    <div v-if="!this.$store.state.isMobile" class="global-background"></div>
    <main-header @clickMenu="clickMenu"></main-header>

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
          <recommend-box></recommend-box>
        </keep-alive>
        <keep-alive>
          <category-box></category-box>
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
  components: {
    NavBar,
    MainHeader,
    SearchBox,
    CategoryBox,
    RecommendBox,
    MainFooter
  },

  methods: {
    clickMenu(){
      if(this.$store.state.isMenuOpen){
        this.$store.commit('openOrCloseMenuMutation', false);
      }else{
        this.$store.commit('openOrCloseMenuMutation', true);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.global-background{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../../assets/img/background.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
}
.wrapper{
  opacity: 0.9;
}
.content{
  display: flex;
  flex-direction: row;
  width: $total-width;
  box-sizing: border-box;
  padding-top: 10px;
  margin: 60px auto 0 auto;
  min-height: calc(100vh - 135px);
}

.left{
  width: $left-width;
  box-sizing: border-box;
  flex-shrink: 0;
}

.center{
  position: relative;
  left: 0;
  width: $center-width;
  box-sizing: border-box;
  margin: 0 10px;
  z-index: 10;
  flex-shrink: 0;
  transition: left 0.5s;
}

.right{
  width: $right-width;
  box-sizing: border-box;
  flex-shrink: 0;
}

.router-fade-enter{
    opacity: 0;
}
.router-fade-enter-active{
    transition-property: opacity;
    transition-duration: 0.3s;
}
.router-fade-leave-active{
    transition-property: opacity;
    transition-duration: 0.3s;
}
.router-fade-leave-to{
    opacity: 0;
}

.is-mobile{
  .content{
    width: 100vw;
  }
  .left{
    width: 0;
  }
  .right{
    display: none;
  }
  .center{
    width: 100vw;
    padding: 0 10px 0 10px;
    margin: 0;
  }
}
.is-mobile .menu-open .center{
  left: $left-width;
}
</style>
