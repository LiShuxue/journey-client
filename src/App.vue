<template>
  <div class="app">
    <main-header></main-header>

    <div class="content">
      <div class="left">
        <nav-bar></nav-bar>
      </div>
      <div class="center">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <div class="right">right</div>
    </div>

    <div class="footer">footer</div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import MainHeader from '@/components/header.vue'

export default {
  name: 'app',
  components: {
    NavBar,
    MainHeader
  }
}
</script>

<style scoped>
@import "./assets/style/base.css";

.app{
  background-color: #EEEEEE;
}

.content{
  display: flex;
  flex-direction: row;
  padding-top: 10px;
  margin-top: 60px;
  min-height: 80vh;
}

.footer{
  background-color: #F8F8F8;
  height: 10vh;
}

.left{
  position: fixed;
  top: 70px;
  left: 0;
  width: 20vw;
}

.center{
  order: 0;
  width: 60vw;
  margin-left: 20vw;
}

.right{
  order: 1;
  width: 20vw;
}
</style>
