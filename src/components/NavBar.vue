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
        { path: '/', name: '主页', style: 'icon-home' },
        { path: '/about', name: '关于', style: 'icon-user' },
        { path: '/test1', name: '关于', style: 'icon-user' },
        { path: '/test2', name: '关于', style: 'icon-user' },
        { path: '/test3', name: '关于', style: 'icon-user' },
        { path: '/test4', name: '关于', style: 'icon-user' },
        { path: '/admin', name: '管理员入口', style: 'icon-user' }
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
  height: calc(100% - 70px - 60px - 51px);
  color: $hui-hei;
  background: $hui-bai;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}

.nav-item{
  color: $hui-hei;
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
    background: $qian-hui;
    color: $qian-lan;
  }
}

a{
  text-decoration: none;
  color: $hui-hei;
  cursor: pointer;
  outline: none;
}
</style>
