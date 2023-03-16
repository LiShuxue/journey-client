<template>
  <div class="upload-wrapper">
    <div>
      <p>1、服务器直传，需要先将文件同步到github，服务器会从github拉取并上传</p>
      <el-input v-model="request.project">
        <template slot="prepend">project：</template>
      </el-input>
      <el-input v-model="request.fromPath">
        <template slot="prepend">fromPath：</template>
      </el-input>
      <el-button size="small" @click="uploadFile" type="primary">点击开始从服务端上传文件</el-button>
    </div>

    <div>
      <p>2、客户端上传，可以直接选择文件进行上传，但是可能公司内网限制上传不了</p>
      <upload />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Upload from '@/components/Upload.vue';
export default {
  components: {
    Upload
  },

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
      // nginx 会重定向到 服务器本地的5555端口，即 http://47.93.18.226:5555
      axios.post('/upload', this.request);
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
