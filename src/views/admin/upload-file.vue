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
      // 5556是nginx端口，会重定向到 服务器本地的5555端口，即 http://47.93.18.226:5555
      this.axios.post('https://lishuxue.site:5556/upload', this.request);
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
