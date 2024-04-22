<template>
  <div class="comments-wrapper">
    <comments-publish @addComments="addComments"></comments-publish>

    <div class="comments-list">
      <comments-item
        v-for="(comment, index) in store.chooseBlog.comments"
        :key="index"
        :comment="comment"
        @replyComments="replyComments"
        @refreshBlogFromChild="refreshBlogFromChild"
      >
      </comments-item>
    </div>
  </div>
</template>

<script lang="ts">
import { useBlogStore } from '../../store';
import API from '@/ajax/api.js';
import CommentsPublish from './CommentsPublish.vue';
import CommentsItem from './CommentsItem.vue';

export default {
  setup() {
    const store = useBlogStore();
    return {
      store,
    };
  },
  components: {
    CommentsPublish,
    CommentsItem,
  },

  methods: {
    addComments({ comment }: any) {
      (this as any).axios
        .post(API.addComments, {
          blogId: this.store.chooseBlog._id,
          comment,
        })
        .then(() => {
          this.$emit('refreshBlogFromChild');
        })
        .catch((err: any) => {
          (this as any).handleError(err);
        });
    },

    replyComments({ parentId, replyId, comment }: any) {
      (this as any).axios
        .post(API.replyComments, {
          blogId: this.store.chooseBlog._id,
          parentId,
          replyId,
          comment,
        })
        .then(() => {
          this.$emit('refreshBlogFromChild');
        })
        .catch((err: any) => {
          (this as any).handleError(err);
        });
    },

    refreshBlogFromChild() {
      this.$emit('refreshBlogFromChild');
    },
  },
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
