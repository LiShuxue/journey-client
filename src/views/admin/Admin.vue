<template>
  <div class="admin">
    <el-row>
      <el-col :span="4">
        <el-menu
          default-active="1"
          class="nav-list"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF">
          <el-menu-item index="home">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
          </el-menu-item>
          <el-menu-item index="test">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="20">
        <div class="content-wrapper">
          <transition name="router-fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      this.$router.push(key)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-list{
  height: 100vh;
}

.content-wrapper{
  margin: 10px 0 0 20px;
}

.router-fade-enter{
    opacity: 0;
}
.router-fade-enter-active{
    transition-property: opacity;
    transition-duration: 0.5s;
}
.router-fade-leave-active{
    transition-property: opacity;
    transition-duration: 0.5s;
}
.router-fade-leave-to{
    opacity: 0;
}
</style>
