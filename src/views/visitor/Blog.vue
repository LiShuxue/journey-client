<template>
  <div class="blog">
    <div class="blog-wrapper" v-if="Object.keys(blog).length > 0">
      <div v-if="blog.isOriginal" class="blog-mark">原创</div>
      <div v-else class="blog-mark">转载</div>
      <h1 class="blog-title">{{blog.title}}</h1>
      <div class="blog-img">
        <img :src="blog.image.url" :alt="blog.image.name">
      </div>
      <div class="blog-content">
        <div class="markdown-body" v-html="blog.htmlContent"></div>
      </div>
    </div>

    <div class="pre-next">
      <p class="item" v-if="this.preBlog" @click.stop="clickPreBlog">上一篇：{{this.preBlog.title}}</p>
      <p class="item" v-if="this.nextBlog" @click.stop="clickNextBlog">下一篇：{{this.nextBlog.title}}</p>
    </div>

    <div class="edit-wrapper" v-if="isAdmin">
      <el-form :inline="true">
        <el-form-item>
          <el-button type="primary" @click="editBlog">编辑</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="deleteBlog">删除</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tool-wrapper" v-if="!isAdmin && Object.keys(blog).length > 0">
      <div @click.stop="backToTop" class="iconfont icon-top back-to-top"></div>
      
      <div class="time-info">
        本文于
        <span><u>{{blog.publishTime.substring(0, 10)}}</u></span>
        日发表在
        <span @click.stop="clickCategory(blog.category)" style="cursor: pointer;"><u><b>{{blog.category}}</b></u></span>
        分类下
        <span v-if="blog.updateTime.substring(0, 10) !== blog.publishTime.substring(0, 10)">
          ，修改于
          <u>{{blog.updateTime.substring(0, 10)}}</u>
          日
        </span>
      </div>

      <div class="tags">
        相关标签：
        <span class="tag-item" v-for="(item, index) in blog.tags" :key="index" @click="clickTag(item)">
          {{item}}
        </span>
      </div>

      <div class="see-info">
        该文章已被阅读
        <span><u>{{blog.see}}</u></span>
        次，共有
        <span><u>{{blog.like}}</u></span>
        人喜欢！
      </div>

      <div class="dianzan">
        <span v-if="!isLiked" class="msg1">如果您觉得不错可以为我点赞哦！</span>
        <span v-else class="msg2">很高兴您能喜欢该文章！</span>
        <span @click.stop="clickLike" class="iconfont icon-like like" v-bind:class="[{'liked': isLiked}]"></span>
        <span v-bind:class="[{'liked': isLiked}]"> {{blog.like}}</span> 
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import API from '@/ajax/api.js'

export default {
  data() {
    return {
      isLiked: false,
      preBlog: {},
      nextBlog: {}
    }
  },

  computed: {
    ...mapState({
      blog: 'chooseBlog',
      blogList: 'blogList'
    }),
    isAdmin() {
      return this.$route.path === '/admin/view-blog' && !!this.$store.state.access_token
    }
  },

  watch: {
    blog () {
      this.setLike()
      this.getLastNextBlog()
    }
  },

  async created() {
    if (!this.blogList || this.blogList.length <= 0) {
      const response = await this.axios.get(API.notRequireAuth.blogList)
      const blogList = response.data.blogList
      this.$store.commit('saveBlogListMutation', blogList)
    }
    if (!this.blogList || !this.blog._id) {
      const response = await this.axios.get(`${API.notRequireAuth.blogDetail}?id=${this.$route.params.id}`)
      const blog = response.data.blog
      this.$store.commit('chooseBlog', blog)
    }
    
    this.setLike()
    this.getLastNextBlog()
  },

  methods: {
    setLike() {
      this.isLiked = false
      if (Object.keys(localStorage).includes(this.blog._id) && localStorage.getItem(this.blog._id) === 'true') {
        this.isLiked = true
      }
    },

    backToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },
    editBlog() {
      this.$store.dispatch('chooseBlogAction', this.blog).then(() => {
        this.$router.push({
          name: 'edit-blog',
          params: {
            isEdit: true
          }
        })
      })
    },
    deleteBlog() {
      this.sentry.addBreadcrumb('views/visitor/Blog.vue --> methods: deleteBlog')
      this.$confirm('确认删除吗？', '提示', {
        type: 'warning'
      }).then(() => {
        let ids = [this.blog._id]
        this.axios.post(API.requireAuth.deleteBlog, { ids }).then(response => {
          // this.$router.back()
          this.$router.push({
            name: 'manage-blog'
          })
        }).catch(err => {
          this.handleError(err)
        })
      }).catch(() => {})
    },

    clickLike () {
      this.sentry.addBreadcrumb('components/BlogItem.vue --> method: clickLike')

      // 点赞后存在本地，下次进来的时候显示点赞过
      if (!this.isLiked) {
        this.isLiked = true;
        localStorage.setItem(this.blog._id, this.isLiked);
      } else {
        this.isLiked = false;
        localStorage.removeItem(this.blog._id);
      }
      
      this.axios.post(API.notRequireAuth.likeBlog, {
        id: this.blog._id,
        isLiked: this.isLiked
      }).then(response => {
        // 刷新页面显示
        if (this.isLiked) {
          this.blog.like++;
        } else {
          this.blog.like--;
        }
      }).catch(err => {
        this.handleError(err)
      })
    },
    clickCategory(category) {
      let blogListWithSameCategory = this.blogList.filter((value) => {
        return value.category === category
      })
      this.$store.commit('saveFilterBlogList', blogListWithSameCategory)
      this.$router.push('/bloglist')
    },
    clickTag (tag) {
      let blogListWithSameTag = this.blogList.filter((value) => {
        return value.tags.includes(tag)
      })
      this.$store.commit('saveFilterBlogList', blogListWithSameTag)
      this.$router.push('/bloglist')
    },

    getLastNextBlog() {
      this.preBlog = null
      this.nextBlog = null

      this.getBlogFromCategoryList()
      this.getBlogFromAll()
    },

    getBlogFromCategoryList() {
      let blogListWithSameCategory = this.blogList.filter((value) => {
        return value.category === this.blog.category
      }) 
      let searchList = blogListWithSameCategory
      let currentIndex = 0
      searchList.forEach((value, index) => {
        if (value._id === this.blog._id) {
          currentIndex = index
        }
      })

      if (this.nextBlog === null && currentIndex - 1 >= 0) {
        this.nextBlog = searchList[currentIndex - 1]
      }
      if (this.preBlog === null && currentIndex + 1 < searchList.length) {
        this.preBlog = searchList[currentIndex + 1]
      }
    },
    getBlogFromAll() {
      let searchList = this.blogList
      let currentIndex = 0
      searchList.forEach((value, index) => {
        if (value._id === this.blog._id) {
          currentIndex = index
        }
      })

      if (this.nextBlog === null && currentIndex - 1 >= 0) {
        this.nextBlog = searchList[currentIndex - 1]
      }
      if (this.preBlog === null && currentIndex + 1 < searchList.length) {
        this.preBlog = searchList[currentIndex + 1]
      }
    },

    clickPreBlog() {
      this.$store.dispatch('chooseBlogAction', this.preBlog).then(() => {
        window.scrollTo(0, 0)
      })
    },
    clickNextBlog() {
      this.$store.dispatch('chooseBlogAction', this.nextBlog).then(() => {
        window.scrollTo(0, 0)
      })
    }
  }
}
</script>
<style lang="scss">
.blog{
  .blog-wrapper{
    position: relative;
    overflow: scroll;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 0 20px 40px 20px;
    background: $hui-bai;

    .blog-mark{
      position: absolute;
      display: inline-block;
      text-align: center;
      top: 0;
      left: 0;
      transform: rotate(-45deg) translate(-8px, -22px);
      transform-origin: center;
      color: $hui-bai;
      background: $qian-lan;
      font-size: $mediu-small-size;
      width: 60px;
      padding: 23px 0 1px 0;
      opacity: 0.7;
    }
    .blog-title{
      margin: 25px 0 30px 0;
      display: flex;
      justify-content: center;
    }

    .blog-content{ 
      @import "../../assets/style/markdown"; 
      @import "../../assets/style/highlight"; 

      .markdown-body {
        box-sizing: border-box;
        margin: 0 auto;
        padding: 20px 10px 0 10px;
      }
    }
    
    /*下面的方法实现长宽比*/
    .blog-img {
      position: relative; /*容器所有子元素需要绝对定位*/
      height: 0; /*容器高度是由padding来控制*/
      padding-top: 37.5%; /* 300 / 800 = 0.375 */
      margin-bottom: 15px;
      border: 5px solid $shen-hui;
      border-radius: 5px;
    }
    .blog-img > img{ /*子元素的宽高和容器一样*/
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: .9;
      &:hover{
        opacity: 1;
        transition: all .25s;
      }
    }
  }

  .edit-wrapper{
    margin-top: 20px;
  }

  .tool-wrapper{
    margin-top: 20px;
    padding: 20px;
    background: $hui-bai;
    border-radius: 10px;
    color: $hui-hei;

    .back-to-top{
      cursor: pointer;
      border: 1px solid black;
      padding: 5px;
      border-radius: 50%;
      position: fixed;
      bottom: 90px;
      right: calc(50vw - 400px + 40px);
    }

    .time-info, .dianzan, .see-info, .tags{
      margin-bottom: 20px;
    }
    .time-info, .dianzan, .see-info{
      line-height: 25px;
    }

    .tags{
      line-height: 32px;
      .tag-item{
        cursor: pointer;
        padding: 5px;
        background: $shen-hui;
        border-radius: 10px;
        margin-right: 10px;
      }
    }

    .dianzan{
      .like{
        cursor: pointer;
        font-size: 25px;
      }
      .liked {
        color: #2192F5;
      }
      .msg1, .msg2{
        margin-right: 5px;
      }
    }
  }

  .pre-next{
    margin-top: 20px; 
    padding: 5px 20px;
    background: $hui-bai;
    border-radius: 10px;
    color: $hui-hei;
    .item{
      color: #2192F5;
      text-decoration: underline;
      cursor: pointer;
    }
  }
}

.is-mobile .blog-wrapper .markdown-body{
  padding: 15px 5px 0 5px
}
.is-mobile .blog-wrapper {
  padding: 0 10px 20px 10px
}
.is-mobile .back-to-top{
  bottom: 85px !important;
  right: 20px !important;
}
</style>
