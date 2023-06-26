<template>
  <footer class="footer">
    <div class="ft"></div>
    <div v-if="isMobile" class="content">
      <span class="name">进阶之路</span>
      <span class="power">Powered by Vue</span>
    </div>
    <div v-else class="content">
      <span class="name">进阶之路</span>
      <span class="power">Powered by Vue</span>
      <a class="beian" href="http://www.beian.miit.gov.cn/" target="_blank">豫ICP备19022227号-1</a>
    </div>
    <div class="fr"></div>
  </footer>
</template>

<script setup lang="ts">
import { isMobile } from '../utils/device';
</script>

<style lang="scss" scoped>
.footer {
  position: relative;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 15px;
  height: 60px;
  font-size: $mediu-size;
  color: $hui-hei;
  background-color: $hui-bai;
  transition: left 0.5s;
}
.ft {
  order: 0;
  flex-basis: $left-width;
}
.fr {
  order: 2;
  flex-basis: $right-width;
}
.content {
  order: 1;
  flex-basis: $center-width;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.name {
  border-right: 1px dashed $shen-hui;
  padding: 0 20px;
}
.power {
  border-right: 1px dashed $shen-hui;
  padding: 0 20px;
}
.beian {
  padding: 0 20px;
}

.is-mobile {
  .ft,
  .fr {
    display: none;
  }
  .name,
  .power {
    padding: 0 10px;
  }
  .power {
    border: none;
  }
}
.is-mobile .menu-open .footer {
  left: $left-width;
}
</style>
