<template>
  <div v-if="!comment.isHide" class="comment-item">
    <div class="arthur">
      {{ comment.arthur }}
      <span v-if="comment.replyName">回复&nbsp;{{ comment.replyName }}</span>
    </div>
    <div class="content">{{ comment.content }}</div>
    <div class="comment-tool-wrapper">
      <div class="date">{{ dayjs(comment.date).format('YYYY-MM-DD HH:mm:ss') }}</div>
      <div @click="showAddComments" style="cursor: pointer">回复</div>
    </div>
    <comments-publish
      :showCancle="true"
      @addComments="addComments"
      @hide="hideAddComments"
      v-if="show"
    ></comments-publish>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import API from '@/ajax/api.js';
import CommentsPublish from './CommentsPublish.vue';

export default {
  components: {
    CommentsPublish,
  },

  props: {
    parent: {
      type: Object,
      required: false,
    },
    comment: {
      type: Object,
      required: true,
    },
    blog: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      show: false,
      dayjs,
    };
  },

  methods: {
    showAddComments() {
      this.show = true;
    },
    hideAddComments() {
      this.show = false;
    },

    addComments({ comment }) {
      this.$emit('addComments', {
        comment,
        parentId: this.parent ? this.parent.id : this.comment.id,
        replyName: this.comment.arthur,
        replyEmail: this.comment.email,
        replyContent: this.comment.content,
      });
      this.show = false;
    },

    hideComments(commentId) {
      this.axios
        .post(API.requireAuth.hideComments, { blog_id: this.blog._id, commentId })
        .then(() => {
          this.$emit('refreshBlogFromChild');
        })
        .catch((err) => {
          this.handleError(err);
        });
    },

    deleteComments(commentId) {
      this.axios
        .post(API.requireAuth.deleteComments, { blog_id: this.blog._id, commentId })
        .then(() => {
          this.$emit('refreshBlogFromChild');
        })
        .catch((err) => {
          this.handleError(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.comment-item {
  margin-bottom: 5px;
  border-bottom: 1px $qian-hui solid;
  .arthur {
    color: $hui-hei;
    padding: 5px;
  }
  .content {
    padding: 5px;
  }
  .comment-tool-wrapper {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: $hui-hei;
    padding: 5px;
    display: flex;
    .date {
      margin-right: 10px;
    }
  }
}
</style>
