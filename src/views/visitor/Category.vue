<template>
  <div class="category">
    <h3>知识，要靠一点一滴的积累</h3>
    <div>
      <p v-for="(category, index) in categoryList" :key="index" @click="clickCategory(category)">
        <span class="icon iconfont icon-category"></span>
        <span>{{category}}</span>
        <span>（{{blogList.filter(value=>{return value.category===category}).length}}）</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState([
      'blogList'
    ]),
    ...mapGetters([
      'categoryList'
    ])
  },
  methods: {
    clickCategory(category) {
      let blogListWithSameCategory = this.blogList.filter((value) => {
        return value.category === category
      })
      this.$store.commit('saveFilterBlogList', blogListWithSameCategory)
      this.$router.push('/bloglist')
    }
  }
}
</script>

<style lang="scss">
.category{
  box-sizing: border-box;
  border-radius: 10px;
  padding: 20px 20px 20px 20px;
  margin-bottom: 40px;
  background: $hui-bai;
  color: $hui-hei;

  p{
    display: flex;
    align-items: center;
    width: 150px;
    background: $qian-hui;
    padding: 5px;
    margin: 0 10px 10px 0;
    border-radius: 10px;
    cursor: pointer;
    font-size: $mediu-size;
    &:hover{
      background: $shen-hui;
    }
    .icon{
      width: 20px;
      margin-right: 5px;
    }
    :nth-child(2){
      margin-right: 5px;
    }
  }
}
</style>
