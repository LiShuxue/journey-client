<template>
  <div class="comments-wrapper">
    <div class="comments-list">
      <comments-publish @addComments="addComments"></comments-publish>

      <div v-for="(comment, index) in store.chooseBlog.comments" :key="index">
        <comments-item
          :comment="comment"
          :blog="store.chooseBlog"
          @addComments="addComments"
          @refreshBlogFromChild="refreshBlogFromChild"
        >
          <div class="comment-reply">
            <div v-for="(item, index) in comment.reply" :key="index">
              <comments-item
                :parent="comment"
                :comment="item"
                :blog="store.chooseBlog"
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
    addComments({
      parentId,
      replyName,
      replyEmail,
      replyContent,
      comment,
    }: {
      parentId: string;
      replyName: string;
      replyEmail: string;
      replyContent: string;
      comment: any;
    }) {
      (this as any).axios
        .post(API.addComments, {
          blog_id: this.store.chooseBlog._id,
          replyName,
          replyEmail,
          replyContent,
          parent_id: parentId,
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
