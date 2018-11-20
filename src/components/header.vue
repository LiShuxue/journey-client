<template>
  <header class="header">
    <div class="nav-menu" v-if="this.$store.state.isMobile" @click="clickMenu">
      <span class="iconfont icon-menu"></span>
    </div>
    <!-- 为了解决在fixed定位下，flex不生效的问题，得在flex上面再包裹一层dom，并设置其宽高-->
    <div class="fix-flex-issue">
      <div class="content">
        <div class="logo"></div>
        <div class="title">
          <div class="blink"></div>
          身体和灵魂，总有一个要在路上
        </div>
        <div class="other"></div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    clickMenu(){
      this.$emit('clickMenu');
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  position: fixed;
  top: 0;
  left: 0;
  background-color: $hui-bai;
  z-index: 100;
  opacity: 0.8;
  width: 100%;
  box-sizing: border-box;
  transition: left 0.5s;
}
.nav-menu{
  position: absolute;
  top: 50%;
  left: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  transform: translateY(-50%);
  .icon-menu{
    font-size: 20px;
  }
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
  color: $qian-lan;
  font-weight: bold;
  font-size: 17px;
  position: relative;
}
.other{
  order: 2;
  flex-basis: 220px;
  box-sizing: border-box;
}
.blink{
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 240px;
  animation: blink 5s infinite;
  &::after{
    content: '';
    height: 70px;
    width: 15px;
    position: absolute;
    top: 0;
    left: -20px;
    background: radial-gradient($hui-bai, rgba(248, 248, 248, 0), rgba(248, 248, 248, 0));
    transform: rotate(30deg) translateY(-30px);
  }
}
@keyframes blink {
  0% { transform: translateX(-5%); }
  100% { transform: translateX(120%); }
}

.is-mobile{
  .title, .other{
    display: none;
  }
}
.is-mobile .menu-open .header{
  left: 160px;
}
</style>
