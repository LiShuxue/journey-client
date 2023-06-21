<template>
  <div class="app" :class="{ 'is-mobile': isMobile }">
    <router-view v-slot="{ Component }">
      <transition name="router-fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { isMobile } from './utils/device';
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
