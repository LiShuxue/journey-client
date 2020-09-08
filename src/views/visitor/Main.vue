<template>
  <div class="wrapper" v-bind:class="{'menu-open': this.$store.state.isMenuOpen, 'directory-open': this.$store.state.isDirectoryOpen}">
    <!-- <div v-if="!this.$store.state.isMobile" class="global-background"></div> -->
    <main-header @clickMenu="clickMenu" @clickDirectory="clickDirectory"></main-header>

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
      <aside v-if="this.$route.name !== 'about'" class="right">
        <search-box></search-box>
        <template v-if="this.$route.name === 'blog'">
          <article-section-list></article-section-list>
        </template>
        <template v-else>
          <keep-alive>
            <tag-box></tag-box>
          </keep-alive>
          <keep-alive>
            <recommend-box></recommend-box>
          </keep-alive>
        </template>
      </aside>
    </div>

    <main-footer></main-footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import MainHeader from '@/components/header.vue'
import SearchBox from '@/components/search.vue'
import TagBox from '@/components/TagBox.vue'
import RecommendBox from '@/components/recommend.vue'
import MainFooter from '@/components/footer.vue'
import ArticleSectionList from '@/components/ArticleSectionList'

export default {
  components: {
    NavBar,
    MainHeader,
    SearchBox,
    TagBox,
    RecommendBox,
    MainFooter,
    ArticleSectionList
  },

  methods: {
    clickMenu(){
      if(this.$store.state.isMenuOpen){
        this.$store.commit('openOrCloseMenuMutation', false);
      }else{
        this.$store.commit('openOrCloseMenuMutation', true);
      }
    },

    clickDirectory(){
      if(this.$store.state.isDirectoryOpen){
        this.$store.commit('openOrCloseDirectoryMutation', false);
      }else{
        this.$store.commit('openOrCloseDirectoryMutation', true);
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
  overflow: hidden;
}
.content{
  display: flex;
  flex-direction: row;
  width: $total-width;
  box-sizing: border-box;
  padding-top: 70px;
  margin: 0 auto;
  min-height: calc(100vh - 75px);
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
    position: fixed;
    top: 70px;
    right: -$right-width;
    transition: right 0.5s;
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
.is-mobile .directory-open .center{
  left: -$right-width;
}
.is-mobile .directory-open .right{
  right: 0;
}
</style>
