<template>
  <div class="category-wrapper">
    <p class="title">
      <span class="iconfont icon-list"></span>
      <span>分类</span>
    </p>
    <p class="category">
      <span class="category-item" v-for="(item, index) in categoryList" :key="index">
        {{item}}
      </span>
    </p>
  </div>
</template>

<script>
import mockdata from '@/mock/mock'
export default {
  data () {
    return {
      categoryList: mockdata.categoryList
    }
  }
}
</script>

<style lang="scss" scoped>
.category-wrapper{
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px 10px 0 10px;
  background: #F8F8F8;
  border-radius: 5%;
}

.title{
  padding: 5px 10px 6px 0;
  border-bottom: 1px dashed #DADADA;
  color: #6D6D6D;

  span{
    margin-right: 5px;
  }
}
.category{
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.category-item{
  background: #DADADA;
  padding: 5px;
  margin: 0 10px 10px 0;
  border-radius: 10%;
  cursor: pointer;
}
</style>
