<template>
  <div class="header">
    <router-link to="/"><span class="logo"></span></router-link>
    <router-link to="/"><span class="title">身体和灵魂，总有一个要在路上</span></router-link>
  </div>
</template>

<style scoped>
.header{
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  background-color: #F8F8F8;
  z-index: 10;
  opacity: 0.8;
}
.logo{
  position: absolute;
  top: 4vh;
  left: 3vw;
  width: 80px;
  height: 20px;
  background: url('../assets/img/logo.png') no-repeat;
  background-size: contain;
}
.title{
  position: absolute;
  top: 4vh;
  left: 20vw;
  color: #2192F5;
}
</style>
