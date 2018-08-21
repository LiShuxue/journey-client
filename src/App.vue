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
  justify-content: center;
  box-sizing: border-box;
  padding-top: 10px;
  margin-top: 60px;
  min-height: 80vh;
}

.footer{
  background-color: #F8F8F8;
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
</style>
