<template>
  <div class="upload-wrapper">
    <el-input v-model="request.project">
      <template slot="prepend">project：</template>
    </el-input>
    <el-input v-model="request.fromPath">
      <template slot="prepend">fromPath：</template>
    </el-input>
    <el-button size="small" @click="uploadFile">点击上传文件</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      request: {
        project: 'blog-article',
        fromPath: '前端笔记/babel.png'
      }
    };
  },

  methods: {
    uploadFile() {
      this.axios.post('http://lishuxue.site:5555/upload', this.request);
    }
  }
};
</script>

<style lang="scss">
.upload-wrapper {
  width: 100%;
  height: 100vh;
}
</style>
