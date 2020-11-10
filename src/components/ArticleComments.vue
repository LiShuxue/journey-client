<template>
  <div class="comments-wrapper">
    <div class="comments-list">
      <div v-for="(comment, index) in blog.comments" :key="index">
        id: {{comment.id}}
        name: {{comment.arthur}}
        content: {{comment.content}}
        isHide: {{comment.isHide}}
        <button @click="addComments(comment.id, comment.arthur)">reply</button>
        <button v-if="isAdmin" @click="hideComments(comment.id)">hide</button>
        <button v-if="isAdmin" @click="deleteComments(comment.id)">delete</button>
        <div v-for="(item, index) in comment.reply" :key="index">
          id: {{item.id}}
          isHide: {{item.isHide}}
          <button @click="addComments(comment.id, item.arthur)">reply</button>
          <button v-if="isAdmin" @click="hideComments(item.id)">hide</button>
          <button v-if="isAdmin" @click="deleteComments(item.id)">delete</button>
        </div>
        <br/>
      </div>
    </div>

    <div class="comments-publish">
      <el-input placeholder="name" v-model="name">
        <!-- <template slot="prepend">name</template> -->
      </el-input>
      <el-input placeholder="email" v-model="email">
        <!-- <template slot="prepend">email</template> -->
      </el-input>
      <el-input placeholder="content" v-model="content">
        <!-- <template slot="prepend">content</template> -->
      </el-input>
      <el-button type="info" class="confirm-button" @click="addComments()">发表评论</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import API from '@/ajax/api.js'

export default {
  props: {
    isAdmin: Boolean
  },

  data() {
    return {
      name: '',
      email: '',
      content: ''
    }
  },
  computed: {
    ...mapState({
      blog: 'chooseBlog'
    })
  },

  methods: {
    addComments(parentId, replyName) {
      const comment = {
        arthur: this.name,
        email: this.email,
        content: this.content
      }
      this.axios.post(API.notRequireAuth.addComments, { blog_id: this.blog._id, replyName, parent_id: parentId, comment }).then(response => {
        this.$emit('refreshBlogFromChild')
      }).catch((err) => {
        this.handleError(err)
      })
    },

    hideComments(commentId) {
      this.axios.post(API.requireAuth.hideComments, { blog_id: this.blog._id, commentId }).then(response => {
        this.$emit('refreshBlogFromChild')
      }).catch((err) => {
        this.handleError(err)
      })
    },

    deleteComments(commentId) {
      this.axios.post(API.requireAuth.deleteComments, { blog_id: this.blog._id, commentId }).then(response => {
        this.$emit('refreshBlogFromChild')
      }).catch((err) => {
        this.handleError(err)
      })
    }
  }
}
</script>

<style lang="scss">
.comments-wrapper{
  
}
</style>
