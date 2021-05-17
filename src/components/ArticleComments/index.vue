<template>
  <div class="comments-wrapper">
    <div class="comments-list">
      <comments-publish @addComments="addComments"></comments-publish>

      <div v-for="(comment, index) in blog.comments" :key="index">
        <comments-item
          :comment="comment"
          :isAdmin="isAdmin"
          :blog="blog"
          @addComments="addComments"
          @refreshBlogFromChild="refreshBlogFromChild"
        >
          <div class="comment-reply">
            <div v-for="(item, index) in comment.reply" :key="index">
              <comments-item
                :parent="comment"
                :comment="item"
                :isAdmin="isAdmin"
                :blog="blog"
                @addComments="addComments"
                @refreshBlogFromChild="refreshBlogFromChild"
              ></comments-item>
            </div>
          </div>
        </comments-item>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import API from '@/ajax/api.js';
import CommentsPublish from './CommentsPublish.vue';
import CommentsItem from './CommentsItem.vue';

export default {
  components: {
    CommentsPublish,
    CommentsItem
  },

  props: {
    isAdmin: Boolean
  },

  computed: {
    ...mapState({
      blog: 'chooseBlog'
    })
  },

  methods: {
    addComments({ parentId, replyName, comment }) {
      this.axios
        .post(API.notRequireAuth.addComments, {
          blog_id: this.blog._id,
          replyName,
          parent_id: parentId,
          comment
        })
        .then(() => {
          this.$emit('refreshBlogFromChild');
        })
        .catch(err => {
          this.handleError(err);
        });
    },

    refreshBlogFromChild() {
      this.$emit('refreshBlogFromChild');
    }
  }
};
</script>

<style lang="scss">
.comments-wrapper {
  background: white;
  padding: 10px;
  margin-top: 20px;
  border-radius: 10px;

  .comments-list {
    .comment-reply {
      background: $qian-hui-2;
      margin-left: 40px;
    }
  }
}
</style>
