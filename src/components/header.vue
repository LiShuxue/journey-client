<template>
  <div class="header">
    <router-link to="/"><span class="logo"></span></router-link>
    <router-link to="/"><span class="title">身体和灵魂，总有一个要在路上</span></router-link>
  </div>
</template>

<style scoped>
.header{
  position: relative;
  box-sizing: border-box;
  height: 10vh;
  background-color: #F8F8F8;
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
  font-family: 'Courier New', Courier, monospace;
  color: #2192F5;
}
</style>
