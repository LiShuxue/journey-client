<template>
  <footer class="footer">
    <div class="ft"></div>
    <div class="content">
      <span class="copyright">Copyright © 2018 LSX</span>
      <span class="power">Powered by Vue</span>
      <span class="other">永不止步</span>
    </div>
    <div class="fr"></div>
  </footer>
</template>

<style lang="scss" scoped>
.footer{
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
.ft{
  order: 0;
  flex-basis: $left-width;
}
.fr{
  order: 2;
  flex-basis: $right-width;
}
.content{
  order: 1;
  flex-basis: $center-width;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.copyright{
  border-right: 1px dashed $shen-hui;
  padding: 0 20px
}
.power{
  border-right: 1px dashed $shen-hui;
  padding: 0 20px
}
.other{
  padding: 0 20px
}

.is-mobile{
  .ft, .fr{
    display: none;
  }
  .copyright, .power, .other{
    padding: 0 10px;
  }
}
.is-mobile .menu-open .footer{
  left: $left-width;
}
</style>
