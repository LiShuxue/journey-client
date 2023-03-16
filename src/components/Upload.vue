<template>
  <div class="upload-box">
    <el-input v-model="ossPath" :disabled="disableInput">
      <template slot="prepend">ossPath：</template>
    </el-input>
    <el-upload
      class="upload-box-content"
      action=""
      :file-list="uploadImageList"
      :http-request="uploadImage"
      :before-remove="removeImage"
      multiple
      accept="image/*"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击开始从客户端上传文件</el-button>
    </el-upload>
  </div>
</template>

<script>
import API from '@/ajax/api.js';
export default {
  props: {
    ossPathByParent: {
      type: String,
      required: false
    },
    disableInput: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      ossPath: 'blog/image/前端笔记',
      uploadImageList: []
    };
  },

  watch: {
    ossPathByParent: {
      handler(val) {
        if (val) {
          this.ossPath = val;
        }
      },
      immediate: true
    }
  },

  methods: {
    async uploadImage(content) {
      this.sentry.addBreadcrumb('components/Upload.vue --> methods: uploadImage');
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      try {
        if (this.ossPath) {
          const key = `${this.ossPath}/${content.file.name}`;
          // 先获取七牛云的上传凭证
          let tokenResponse = await this.axios.get(`${API.requireAuth.uploadToken}?key=${key}`);
          // 上传文件参数
          let formdata = new FormData();
          formdata.append('file', content.file);
          formdata.append('token', tokenResponse.data.qiniuUploadToken);
          formdata.append('key', key);
          // 上传到七牛云
          let response = await this.axios.post(tokenResponse.data.uploadDomain, formdata, config);

          this.$message.success(response.data.key + '上传成功！');
          let url = tokenResponse.data.downloadDomain + response.data.key;
          this.uploadImageList.push({ name: response.data.key, url });
        } else {
          this.$message.error('请先填写需要上传到的路径');
          return Promise.reject(new Error('请先填写需要上传到的路径'));
        }
      } catch (err) {
        this.handleError(err);
        return Promise.reject(err);
      }
    },

    async removeImage(file) {
      this.sentry.addBreadcrumb('components/Upload.vue --> methods: removeImage');
      try {
        let filename = file.name;
        await this.$confirm(`确定移除 ${filename}？`);
        await this.axios.post(API.requireAuth.removeImage, { filename });
        let index = this.uploadImageList.findIndex(item => item.name === filename);
        this.uploadImageList.splice(index, 1);
      } catch (err) {
        this.handleError(err);
        return Promise.reject(err);
      }
    }
  }
};
</script>

<style lang="scss">
.upload-box {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
