<template>
  <div class="search">
    <input type="search" placeholder="请输入关键字查找" class="search-box"/>
    <button class="search-icon">
        <i class="iconfont icon-search"></i>
    </button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "../assets/iconfont/iconfont.css";
.search{
  display: flex;
  padding: 5px 10px;
  background: $hui-bai;
  border-radius: 5%;
}
input, button{
  border: none;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
}
.search-box{
  flex-basis: 175px;
  height: 25px;
  background: $qian-hui;
}
.search-icon{
  flex-basis: 25px;
  height: 25px;
  background: #C5C5C5;
  cursor: pointer;
}
</style>
