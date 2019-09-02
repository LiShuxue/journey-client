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
import $ from 'jquery'
export default {
  computed: {
    ...mapGetters([
      'tagList'
    ])
  },
  mounted() {
    window.onscroll = function() {
      // $(window).scrollTop() // html卷入浏览器的距离
      // $('.tag-wrapper').offsetTop // 元素距离文档顶端的距离 490px，这个是固定的
      // $('.tag-wrapper').offsetTop - $(window).scrollTop() // 元素距离浏览器顶端的距离
      // if($('.tag-wrapper').offsetTop - $(window).scrollTop() <= 70){ // 判断距离小于等于70，可以反过来判断卷入距离大于等于420
      if($(window).scrollTop() >= 420){
        !$('.tag-wrapper').hasClass('sticky-top') && $('.tag-wrapper').addClass('sticky-top')
      }else{
        $('.tag-wrapper').hasClass('sticky-top') && $('.tag-wrapper').removeClass('sticky-top')
      }
    }
  },
  methods: {
    clickTag (tag) {
      let blogList = [...this.$store.state.blogList]
      let blogListWithSameTag = blogList.filter((value) => {
        return value.tags.includes(tag)
      })
      this.$store.commit('saveFilterBlogList', blogListWithSameTag)
      this.$router.push('/bloglist')
    }
  }
}
</script>

<style lang="scss" scoped>
.sticky-top{
  position: fixed;
  /* position: sticky; 未来可以用这个属性值*/
  top: 70px;
  margin-top: 0 !important;
  width: $right-width;
  box-sizing: border-box;
}
.tag-wrapper{
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px 10px 0 10px;
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
}
.tag-item{
  background: $shen-hui;
  padding: 5px;
  margin: 0 10px 10px 0;
  border-radius: 10%;
  cursor: pointer;
  font-size: $mediu-size;
}
</style>
