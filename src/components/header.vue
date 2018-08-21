<template>
  <header class="header">
    <!-- 为了解决在fixed定位下，flex不生效的问题，得在flex上面再包裹一层dom，并设置其宽高-->
    <div class="fix-flex-issue">
      <div class="content">
        <div class="logo"></div>
        <div class="title">身体和灵魂，总有一个要在路上</div>
        <div class="other"></div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header{
  position: fixed;
  top: 0;
  left: 0;
  background-color: #F8F8F8;
  z-index: 10;
  opacity: 0.8;
  width: 100%;
  box-sizing: border-box;
}
.fix-flex-issue{
  width: 100%;
  height: 60px;
}
.content{
  display: flex;
  flex-direction: row;
  justify-content: center;
  box-sizing: border-box;
}
.logo{
  order: 0;
  flex-basis: 160px;
  height: 23px;
  box-sizing: border-box;
  margin-top: 17px;
  background: url('../assets/img/logo.png') no-repeat;
  background-size: contain;
  background-position: center;
}
.title{
  order: 1;
  flex-basis: 600px;
  box-sizing: border-box;
  margin: 17px 10px 0px 10px;
  color: #2192F5;
  font-weight: bold;
  font-size: 17px;
}
.other{
  order: 2;
  flex-basis: 220px;
  box-sizing: border-box;
}
</style>
