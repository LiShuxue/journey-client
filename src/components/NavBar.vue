<template>
  <nav class="nav">
    <div v-for="(item, index) in navList" :key="index">
        <router-link v-bind:to="item.path" @click.native="closeMenu">
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
        { path: '/home', name: '主页', style: 'icon-home' },
        { path: '/about', name: '关于', style: 'icon-user' },
        { path: '/admin', name: '管理员入口', style: 'icon-user' }
      ]
    }
  },
  methods: {
    closeMenu() {
      if(this.$store.state.isMenuOpen){
        this.$store.commit('openOrCloseMenuMutation', false);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav{
  position: fixed;
  top: 70px;
  width: $left-width;
  height: calc(100% - 70px - 75px - 45px);
  color: $hui-hei;
  background: $hui-bai;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
  opacity: 0.8;
}

.nav-item{
  color: $hui-hei;
  padding: 10px 10px 10px 10px;
  margin-bottom: 10px;
  border-radius: 20%;
  &:hover{
    background: $shen-hui;
  }
}
.nav-icon{
  margin-right: 15px;
}
.nav-title{
  font-weight: bold;
}

.router-link-exact-active{
  & .nav-item{
    background: $shen-hui;
    color: $qian-lan;
  }
}

a{
  text-decoration: none;
  color: $hui-hei;
  cursor: pointer;
  outline: none;
}
.is-mobile .nav{
  top: 0;
  height: 100vh;
  left: -$left-width;
  border-radius: 0;
  transition: left 0.5s;
}
.is-mobile .menu-open .nav{
  left: 0;
}
</style>
