<template>
  <div class="tag-wrapper">
    <p class="title">
      <span class="iconfont icon-tag"></span>
      <span>标签</span>
    </p>
    <p class="tag">
      <span class="tag-item" v-for="(item, index) in tagList" :key="index" @click="clickTag(item)">
        {{item}}
      </span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'tagList'
    ])
  },
  methods: {
    clickTag (tag) {
      this.$router.push({
        name: 'bloglist',
        query: {
          tag
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-wrapper{
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px;
  background: $hui-bai;
  border-radius: 5%;
  color: $hui-hei;
}

.title{
  padding: 5px 10px 6px 0;
  border-bottom: 1px dashed $shen-hui;
  font-size: $large-size;

  span{
    margin-right: 5px;
  }
}
.tag{
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  max-height: 400px;
  overflow: scroll;
}
.tag-item{
  background: $shen-hui;
  padding: 5px;
  margin: 0 10px 10px 0;
  border-radius: 10%;
  cursor: pointer;
  font-size: $mediu-size;
}
.is-mobile .tag-wrapper{
  display: none;
}
</style>
