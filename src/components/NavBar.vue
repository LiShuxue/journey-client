<template>
  <nav class="nav">
    <div v-for="(item, index) in navList" :key="index">
        <router-link v-bind:to="item.path">
          <div class="nav-item">
            <span class="nav-icon iconfont" v-bind:class="item.style"></span>
            <span class="nav-title">{{item.name}}</span>
          </div>
        </router-link>
    </div>
  </nav>
</template>

<script>
export default{
  data () {
    return {
      navList: [
        {path: '/', name: '主页', style: 'icon-home'},
        {path: '/about', name: '关于', style: 'icon-user'},
        {path: '/test1', name: '关于', style: 'icon-user'},
        {path: '/test2', name: '关于', style: 'icon-user'},
        {path: '/test3', name: '关于', style: 'icon-user'},
        {path: '/test4', name: '关于', style: 'icon-user'},
        {path: '/test5', name: '关于', style: 'icon-user'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/iconfont/iconfont.css";

.nav{
  position: fixed;
  top: 70px;
  width: 160px;
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}

.nav-item{
  color: #6D6D6D;
  padding: 10px 10px 10px 10px;
  margin-bottom: 10px;
  border-radius: 20%;
}
.nav-icon{
  margin-right: 15px;
}
.nav-title{
  font-weight: bold;
}

.router-link-exact-active{
  & .nav-item{
    background-color: #F8F8F8;
    color: #2192F5;
  }
}
</style>
