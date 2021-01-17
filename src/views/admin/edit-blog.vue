<template>
  <div class="edit">
    <el-input placeholder="文章标题" v-model="title" class="input-box">
      <template slot="prepend">文章标题：</template>
    </el-input>
    <el-input placeholder="文章摘要" v-model="subTitle" class="input-box">
      <template slot="prepend">文章摘要：</template>
    </el-input>

    <div class="category-radio-box">
      <span class="box-title">分类：</span>
      <el-radio-group v-model="category" size="small" :disabled="isEdit">
        <el-radio v-for="(category, index) in categoryList" :key="index" :label="category" border>{{
          category
        }}</el-radio>
      </el-radio-group>
      <el-button @click="addCategory" size="small">+ 创建新分类</el-button>
    </div>

    <div class="upload-box">
      <el-upload
        class="upload-box-content"
        action=""
        :file-list="uploadImageList"
        :http-request="uploadImage"
        :before-remove="removeImage"
        :limit="1"
        accept="image/*"
        list-type="picture"
      >
        <el-button v-if="!image.url" size="small">点击上传文章插图</el-button>
      </el-upload>
      <el-button v-if="image.url" size="small" @click="removeImage">点击修改文章插图</el-button>
    </div>

    <!-- <el-input placeholder="图片name" v-model="image.name" class="input-box">
      <template slot="prepend">图片name：</template>
    </el-input>
    <el-input placeholder="图片url" v-model="image.url" class="input-box">
      <template slot="prepend">图片url：</template>
    </el-input> -->

    <div class="blog-content">
      <mavon-editor
        class="markdown-editor-wrapper"
        @change="markdownContentChange"
        @save="markdownContentSave"
        :subfield="showParseText"
        placeholder=" "
        :value="initContent"
      ></mavon-editor>
    </div>

    <div class="tags-box">
      <span class="box-title">标签：</span>
      <el-tag v-for="tag in tags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
        {{ tag }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新标签</el-button>
    </div>

    <div class="radio-box">
      <el-radio-group v-model="isOriginal">
        <el-radio :label="true">原创</el-radio>
        <el-radio :label="false">转载</el-radio>
      </el-radio-group>
    </div>
    <el-button v-if="isEdit" type="info" class="confirm-button" @click="editBlog">修改文章</el-button>
    <el-button v-else type="info" class="confirm-button" @click="publishBlog">发布文章</el-button>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import API from '@/ajax/api.js';
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      title: '',
      subTitle: '',
      htmlContent: '',
      markdownContent: '',
      image: {
        name: '',
        url: ''
      },
      isOriginal: true,
      category: '',
      tags: [],

      uploadImageList: [],
      inputVisible: false,
      inputValue: '',

      showParseText: false, // 单双栏模式
      initContent: '' // 编辑器的初始值
    };
  },

  computed: {
    ...mapState({
      chooseBlog: 'chooseBlog',
      blogList: 'blogList'
    }),
    isEdit() {
      return this.$route.params.isEdit;
    },
    ...mapGetters(['categoryList'])
  },

  components: {
    mavonEditor
  },

  async created() {
    this.sentry.addBreadcrumb('views/visitor/Home.vue --> lifecycle: created', this.isEdit);
    if (this.isEdit) {
      let editBlog = Object.assign({}, this.chooseBlog);
      Object.keys(editBlog).forEach(key => {
        this[key] = editBlog[key];
      });
      this.initContent = editBlog.markdownContent;
      if (this.image && this.image.name && this.image.url) {
        this.uploadImageList.push(Object.assign({}, this.image));
      }
    }

    if (!this.blogList || this.blogList.length <= 0) {
      const response = await this.axios.get(API.notRequireAuth.blogList);
      const blogList = response.data.blogList;
      this.$store.commit('saveBlogListMutation', blogList);
    }
  },

  methods: {
    async uploadImage(content) {
      this.sentry.addBreadcrumb('views/admin/edit-blog.vue --> methods: uploadImage');
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      };

      try {
        // 先获取七牛云的上传凭证
        let tokenResponse = await this.axios.get(API.requireAuth.uploadToken);
        // 上传文件参数
        let formdata = new FormData();
        formdata.append('file', content.file);
        formdata.append('token', tokenResponse.data.qiniuUploadToken);
        if (this.category) {
          formdata.append('key', `blog/image/${this.category}/` + content.file.name);
          // 上传到七牛云
          let response = await this.axios.post(tokenResponse.data.uploadDomain, formdata, config);

          this.$message.success(response.data.key + '上传成功！');
          let url = tokenResponse.data.downloadDomain + response.data.key;
          this.image = { name: response.data.key, url };
          this.uploadImageList.push({ name: response.data.key, url });
          return Promise.resolve();
        } else {
          this.$message.error('请先选择类别');
          return Promise.reject(new Error('请先选择类别'));
        }
      } catch (err) {
        this.handleError(err);
        return Promise.reject(err);
      }
    },

    async removeImage() {
      this.sentry.addBreadcrumb('views/admin/edit-blog.vue --> methods: removeImage', this.image);
      try {
        let filename = this.image.name;
        await this.$confirm(`确定移除 ${filename}？`).catch(() => {});
        await this.axios.post(API.requireAuth.removeImage, { filename });
        this.image = {};
        this.uploadImageList.pop();
        return Promise.resolve();
      } catch (err) {
        this.handleError(err);
        return Promise.reject(err);
      }
    },

    markdownContentChange(markdown, html) {
      this.markdownContent = markdown;
      this.htmlContent = html;
    },
    markdownContentSave(markdown, html) {
      this.markdownContent = markdown;
      this.htmlContent = html;
    },

    addCategory() {
      this.sentry.addBreadcrumb('views/admin/edit-blog.vue --> methods: addCategory');
      this.$prompt('请输入要添加的类别：')
        .then(({ value }) => {
          this.categoryList.push(value);
          this.category = value;
        })
        .catch(() => {});
    },

    handleClose(tag) {
      this.sentry.addBreadcrumb('views/admin/edit-blog.vue --> methods: handleClose', tag);
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    showInput() {
      this.sentry.addBreadcrumb('views/admin/edit-blog.vue --> methods: showInput');
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      this.sentry.addBreadcrumb('views/admin/edit-blog.vue --> methods: handleInputConfirm');
      let inputValue = this.inputValue;
      if (inputValue) {
        this.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    publishBlog() {
      this.sentry.addBreadcrumb('views/admin/edit-blog.vue --> methods: publishBlog');
      this.axios
        .post(API.requireAuth.publishBlog, {
          blog: {
            title: this.title,
            subTitle: this.subTitle,
            image: this.image,
            htmlContent: this.htmlContent,
            markdownContent: this.markdownContent,
            isOriginal: this.isOriginal,
            category: this.category,
            tags: this.tags
          }
        })
        .catch(err => {
          this.handleError(err);
        });
    },
    editBlog() {
      this.sentry.addBreadcrumb('views/admin/edit-blog.vue --> methods: editBlog');
      this.axios
        .post(API.requireAuth.updateBlog, {
          blog: {
            _id: this.chooseBlog._id,
            title: this.title,
            subTitle: this.subTitle,
            image: this.image,
            htmlContent: this.htmlContent,
            markdownContent: this.markdownContent,
            isOriginal: this.isOriginal,
            category: this.category,
            tags: this.tags
          }
        })
        .catch(err => {
          this.handleError(err);
        });
    }
  }
};
</script>

<style lang="scss">
.input-box {
  margin-bottom: 10px;
}
.upload-box {
  margin-top: 10px;
  margin-bottom: 10px;
}
.markdown-editor-wrapper {
  min-width: 0 !important;
  height: 500px;
}

.box-title {
  color: $hui-hei;
  line-height: 32px;
}
.tags-box {
  margin-top: 10px;
  .el-tag {
    margin-right: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
}
.el-radio.is-bordered {
  margin-right: 10px;
}
.el-radio.is-bordered + .el-radio.is-bordered {
  margin-right: 10px;
  margin-left: 0px;
}
.category-radio-box {
  label {
    background: white;
  }
  margin-top: 10px;
}
.radio-box {
  margin-top: 10px;
}
.confirm-button {
  margin-top: 10px;
}
</style>
