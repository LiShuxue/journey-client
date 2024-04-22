<template>
  <div v-if="!comment.isHide" class="comment-item">
    <div class="arthur">
      {{ comment.arthur }}
      <span v-if="!comment.isReplyParent && comment.replyArthur"
        >回复&nbsp;{{ comment.replyArthur }}</span
      >
      <span v-else-if="comment.isReplyParent">回复&nbsp;楼主</span>
    </div>
    <div class="content">{{ comment.content }}</div>
    <div class="comment-tool-wrapper">
      <div class="date">{{ dayjs(comment.date).format('YYYY-MM-DD HH:mm:ss') }}</div>
      <div @click="showAddComments" style="cursor: pointer">回复</div>
    </div>
    <comments-publish
      v-if="show"
      :showCancle="true"
      @addComments="(val) => replyComments({ comment: val.comment, replyId: comment.id })"
      @hide="hideAddComments"
    >
    </comments-publish>

    <div class="comment-reply">
      <div v-for="(item, index) in comment.reply" :key="index">
        <comments-item
          :parent="comment"
          :comment="item"
          @replyComments="replyComments"
          @refreshBlogFromChild="refreshBlogFromChild"
        ></comments-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs';
import CommentsPublish from './CommentsPublish.vue';
import { useBlogStore } from '../../store';

export default {
  setup() {
    const store = useBlogStore();
    return {
      store,
    };
  },

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

    replyComments({ comment, replyId }: any) {
      this.$emit('replyComments', {
        comment,
        parentId: this.parent ? this.parent.id : this.comment.id,
        replyId,
      });
      this.show = false;
    },

    refreshBlogFromChild() {
      this.$emit('refreshBlogFromChild');
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
