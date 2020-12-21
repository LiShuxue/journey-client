<template>
  <div class="comments-wrapper">
    <div class="comments-list">
      <div v-for="(comment, index) in blog.comments" :key="index">
        <div v-if="!comment.isHide" class="comment-item">
          <div class="arthur">{{comment.arthur}}</div>
          <div class="content">{{comment.content}}</div>
          <div class="comment-tool-wrapper">
            <div class="date">{{dayjs(comment.date).format('YYYY-MM-DD')}}</div>
            <div @click="addComments(comment.id, comment.arthur)" style="cursor: pointer;">reply</div>
            <div v-if="isAdmin" @click="hideComments(comment.id)" style="cursor: pointer;">hide</div>
            <div v-if="isAdmin" @click="deleteComments(comment.id)" style="cursor: pointer;">delete</div>
          </div>
          
          <div v-for="(item, index) in comment.reply" :key="index">
            <div v-if="!item.isHide" class="comment-reply-item">
              <div class="arthur">{{item.arthur}}</div>
              <div class="content">{{item.content}}</div>
              <div class="comment-tool-wrapper">
                <div class="date">{{dayjs(item.date).format('YYYY-MM-DD')}}</div>
                <div @click="addComments(comment.id, item.arthur)" style="cursor: pointer;">reply</div>
                <div v-if="isAdmin" @click="hideComments(item.id)" style="cursor: pointer;">hide</div>
                <div v-if="isAdmin" @click="deleteComments(item.id)" style="cursor: pointer;">delete</div>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>

    <div class="comments-publish">
      <el-input placeholder="name" v-model="name" size="mini" class="arthur-info">
      </el-input>
      <el-input placeholder="email" v-model="email" size="mini" class="arthur-info">
      </el-input>
      
      <el-input type="textarea" :rows="3" placeholder="发表您的见解" v-model="content" class="comment-content">
      </el-input>
      <el-button type="info" class="confirm-button" @click="addComments()" size="mini">评论</el-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
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
      content: '',
      dayjs
    }
  },
  computed: {
    ...mapState({
      blog: 'chooseBlog'
    }),
    displayPublishTime() {
      return dayjs(this.blog.publishTime).format('YYYY-MM-DD')
    }
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
  background: white;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;

  .comments-list{
    .comment-item, .comment-reply-item{
      .arthur{
        font-size: 20px;
        padding: 5px;
      }
      .content {
        padding: 5px;
      }
      .comment-tool-wrapper{
        padding: 5px;
        display: flex;
        .date{
          margin-right: 10px;
        }
      }
    }
    .comment-item{
      margin-bottom: 20px;
      background: $qian-hui;
    }
    .comment-reply-item{
      margin-bottom: 10px;
      margin-left: 30px;
      background: $qian-hui;
    }
  }

  .comments-publish{
    .arthur-info{
      display: block;
      width: 50%;
      margin-bottom: 10px;
    }
    .comment-content{
      margin-bottom: 10px;
    }
  }
}
</style>
