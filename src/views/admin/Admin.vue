<template>
  <div class="admin" v-bind:class="{ 'is-mobile': this.$store.state.isMobile }">
    <el-menu
      default-active="1"
      class="nav-list"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409EFF">
      <el-menu-item index="home">
        <i class="el-icon-menu"></i>
        <span class="nav-item-title" slot="title">导航一</span>
      </el-menu-item>
      <el-menu-item index="edit">
        <i class="el-icon-menu"></i>
        <span class="nav-item-title" slot="title">写博客</span>
      </el-menu-item>
    </el-menu>

    <div class="content-wrapper">
      <transition name="router-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect (key, keyPath) {
      this.$router.push(key)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-list{
  position: fixed;
  top: 0;
  left: 0;
  width: 17vw;
  height: 100vh;
}

.content-wrapper{
  padding: 10px 20px 10px 20px;
  margin-left: 17vw;
}

.router-fade-enter{
    opacity: 0;
}
.router-fade-enter-active{
    transition-property: opacity;
    transition-duration: 0.3s;
}
.router-fade-leave-active{
    transition-property: opacity;
    transition-duration: 0.3s;
}
.router-fade-leave-to{
    opacity: 0;
}

.is-mobile .nav-item-title{
  display: none;
}
</style>
