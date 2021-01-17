<template>
  <div class="app" v-bind:class="{ 'is-mobile': this.$store.state.isMobile }">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.app {
  background-color: $qian-hui;
}
.router-fade-enter {
  opacity: 0;
}
.router-fade-enter-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}
.router-fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.3s;
}
.router-fade-leave-to {
  opacity: 0;
}
</style>
