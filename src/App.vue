<template>
  <div class="app">
    <div class="header">header</div>

    <div class="content">
      <div class="left">
        left
        <nav-bar></nav-bar>
      </div>
      <div class="center">
        center
        <router-view/>
      </div>
      <div class="right">right</div>
    </div>

    <div class="footer">footer</div>
    
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>

<style scoped>
@import "./assets/style/base.css"; 
.app{
  background-color: #EEEEEE;
}

.header{
  background-color: #F8F8F8;
  height: 10vh;
}

.content{
  display: flex;
  flex-direction: row;
  height: 80vh;
}

.footer{
  background-color: #F8F8F8;
  height: 10vh;
}

.left{
  order: 0;
  width: 20vw;
}

.center{
  order: 1;
  width: 60vw;
  background-color: #b6b6b6;
}

.right{
  order: 2;
  width: 20vw;
}
</style>
