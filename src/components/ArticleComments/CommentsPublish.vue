<template>
  <div class="comments-publish">
    <div class="arthur-info">
      <el-input placeholder="arthur" v-model="arthur" size="mini" style="margin-right: 5px;" maxLength="20"> </el-input>
      <el-input type="email" placeholder="email@example.com" v-model="email" size="mini" maxLength="30"> </el-input>
    </div>

    <el-input type="textarea" :rows="3" placeholder="发表您的见解" v-model="content" class="comment-content">
    </el-input>
    <el-button v-if="showCancle" type="info" class="cancle-button" @click="hideComments" size="mini">取消</el-button>
    <el-button type="info" class="confirm-button" @click="addComments()" size="mini">评论</el-button>
  </div>
</template>

<script>
export default {
  props: {
    showCancle: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      arthur: '',
      email: '',
      content: ''
    };
  },

  created() {
    this.arthur = localStorage.getItem('arthur');
    this.email = localStorage.getItem('email');
  },

  methods: {
    validateInputSuccess() {
      if (
        !this.arthur ||
        !this.email ||
        !this.content ||
        !this.arthur.toString().trim() ||
        !this.email.toString().trim() ||
        !this.content.toString().trim()
      ) {
        this.$message.error('请正确填写相关信息');
        return false;
      }

      const pattern = new RegExp(/^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+.([A-Za-z]{2,8})$/);
      if (!pattern.test(this.email)) {
        this.$message.error('请正确填写邮件地址，如果有回复我们将以邮件通知您');
        return false;
      }

      return true;
    },

    addComments() {
      if (this.validateInputSuccess()) {
        const comment = {
          arthur: this.arthur.toString().trim(),
          email: this.email.toString().trim(),
          content: this.content.toString().trim()
        };
        localStorage.setItem('arthur', this.arthur.toString().trim());
        localStorage.setItem('email', this.email.toString().trim());
        this.$emit('addComments', { comment });
      }
    },

    hideComments() {
      this.$emit('hide');
    }
  }
};
</script>

<style lang="scss" scoped>
.comments-publish {
  position: relative;
  background: $qian-hui-2;
  .arthur-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  .comment-content {
    margin-bottom: 45px;
  }
  .cancle-button {
    position: absolute;
    right: 60px;
    bottom: 10px;
  }
  .confirm-button {
    position: absolute;
    right: 0px;
    bottom: 10px;
  }
}
</style>
