<template>
  <div class="edit">
    <el-input placeholder="文章标题" v-model="title" class="input-box">
      <template slot="prepend">文章标题：</template>
    </el-input>
    <el-input placeholder="文章摘要" v-model="subTitle" class="input-box">
      <template slot="prepend">文章摘要：</template>
    </el-input>

    <div class="upload-box">
      <el-upload
        class="upload-box-content"
        action=""
        :file-list="uploadImageList"
        :http-request="myUpload"
        :before-remove="beforeRemove"
        :limit="1"
        :accept="acceptFileType"
        list-type="picture">
        <el-button size="small">点击上传文章插图</el-button>
      </el-upload>
    </div>

    <div class="choose-editor">
      <el-button type="info" @click="chooseMarkdown" size="small">Mardown编辑器</el-button>
      <el-button type="info" @click="chooseEdit" size="small">富文本编辑器</el-button>
    </div>

    <div :class="isMarkdown ? 'show' : 'not-show'">
      <mavon-editor class="markdown-editor-wrapper" @change="markdownContentChange" @save="markdownContentSave" :subfield="showParseText" placeholder=" "></mavon-editor>
    </div>
    <div :class="isMarkdown ? 'not-show' : 'show'">
      <div ref="wangeditor" class="wang-editor-wrapper"></div>
    </div>

    <div class="category-radio-box">
      <span class="box-title">分类：</span>
      <el-radio-group v-model="category" size="small">
        <el-radio v-for="category in categorys" :key="category" :label="category" border>{{category}}</el-radio>
      </el-radio-group>
      <el-button @click="addCategory" size="small">+ 创建新分类</el-button>
    </div>

    <div class="tags-box">
      <span class="box-title">标签：</span>
      <el-tag
        v-for="tag in tags"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)">
        {{tag}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="small"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm">
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加新标签</el-button>
    </div>

    <div class="radio-box">
      <el-radio-group v-model="isOriginal">
        <el-radio :label=true>原创</el-radio>
        <el-radio :label=false>转载</el-radio>
      </el-radio-group>
    </div>

    <el-button type="info" class="confirm-button" @click="publishBlog">发布文章</el-button>
  </div>
</template>

<script>
import WangEditor from 'wangeditor'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import API from '@/ajax/api.js'
export default {
  data () {
    return {
      title: '',
      subTitle: '',
      isOriginal: true,
      category: '',
      categorys: [],
      tags: [],
      image: '',
      uploadImageList: [],
      acceptFileType: 'image/*',
      fileNameInServer: '',
      inputVisible: false,
      inputValue: '',
      isMarkdown: true,
      wangeditor: null,
      wangeditorContent: '',
      markdownPlaceholder: '',
      htmlContent: '',
      markdownContent: '',
      showParseText: false
    }
  },
  components: {
    mavonEditor
  },
  created () {
    this.getAllCategory()
  },
  mounted () {
    this.wangeditor = new WangEditor(this.$refs.wangeditor)
    this.initWangEditorConfig()
    this.wangeditor.create()
  },
  methods: {
    async myUpload (content) {
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }

      try {
        // 先获取七牛云的上传凭证
        let tokenResponse = await this.axios.get(API.requireAuth.uploadToken)
        // 上传文件参数
        let formdata = new FormData()
        formdata.append('file', content.file)
        formdata.append('token', tokenResponse.data.qiniuUploadToken)
        formdata.append('key', content.file.name)
        // 上传到七牛云
        let response = await this.axios.post(tokenResponse.data.uploadDomain, formdata, config)

        this.$message.success(response.data.key + '上传成功！')
        this.image = tokenResponse.data.downloadDomain + response.data.key
        this.uploadImageList.push({ name: response.data.key, url: this.image })
        this.fileNameInServer = response.data.key
      } catch (err) {
        err && this.$message.error(err.data.errMsg || err.data)
      }
    },

    async beforeRemove (file, fileList) {
      await this.$confirm(`确定移除 ${file.name}？`).catch(_ => {
        return Promise.reject(_)
      })
      return this.removeFileFromServer()
    },
    async removeFileFromServer () {
      let response = await this.axios.post(API.requireAuth.removeImage, {
        filename: this.fileNameInServer
      }).catch(err => {
        err && this.$message.error(err.data.errMsg || err.data)
        return Promise.reject(err)
      })
      this.$message.success(response.data.successMsg)
      this.uploadImageList.pop()
      return Promise.resolve()
    },
    
    chooseMarkdown () {
      this.isMarkdown = true
    },
    chooseEdit () {
      this.isMarkdown = false
    },

    initWangEditorConfig () {
      this.wangeditor.customConfig.onchangeTimeout = 100
      this.wangeditor.customConfig.onchange = html => {
        this.wangeditorContent = html
      }
      this.wangeditor.customConfig.onblur = html => {
        this.wangeditorContent = html
      }
      this.wangeditor.customConfig.uploadImgShowBase64 = true
    },

    markdownContentChange (markdown, html) {
      this.markdownContent = markdown
      this.htmlContent = html
    },
    markdownContentSave (markdown, html) {
      this.markdownContent = markdown
      this.htmlContent = html
    },

    addCategory () {
      this.$prompt('请输入要添加的类别：').then(({ value }) => {
        this.axios.post(API.requireAuth.addCategory, {
          category: {
            name: value
          }
        }).then(response => {
          this.categorys.push(value)
          this.category = value
          this.$message.success(response.data.successMsg)
        }).catch(err => {
          err && this.$message.error(err.data.errMsg || err.data)
        })
      }).catch(() => {})
    },

    handleClose (tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    showInput () {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm () {
      let inputValue = this.inputValue
      if (inputValue) {
        this.tags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    publishBlog () {
      this.axios.post(API.requireAuth.publishBlog, {
        blog: {
          title: this.title,
          subTitle: this.subTitle,
          image: this.image,
          htmlContent: this.isMarkdown ? this.htmlContent : this.wangeditorContent,
          markdownContent: this.isMarkdown ? this.markdownContent : '',
          isOriginal: this.isOriginal,
          category: this.category,
          tags: this.tags
        }
      }).then(response => {
        this.$message.success(response.data.successMsg)
      }).catch(err => {
        err && this.$message.error(err.data.errMsg || err.data)
      })
    },
    getAllCategory () {
      this.axios.get(API.notRequireAuth.categoryList).then(response => {
        if (response.data.categoryList && response.data.categoryList.length > 0) {
          let _categoryList = response.data.categoryList
          _categoryList.forEach(element => {
            this.categorys.push(element.name)
          })
        }
      }).catch(err => {
        err && this.$message.error(err.data.errMsg || err.data)
      })
    }
  }
}
</script>

<style lang="scss">
.input-box{
  margin-bottom: 10px;
}
.upload-box{
  margin-bottom: 10px;
}
.choose-editor{
  margin-bottom: 10px;
}
.markdown-editor-wrapper{
  min-width: 0 !important;
  height: 500px;
}
.wang-editor-wrapper{
  .w-e-text-container{
    z-index: auto !important;
  }
}

.w-e-toolbar{
  color: #24292e !important;
  background: #fff !important;
  height: 35px !important;
  /* width: 700px !important; */
  border: none !important;
  box-shadow: 0 0px 4px rgba(0,0,0,0.157), 0 0px 4px rgba(0,0,0,0.227);
}
.w-e-text-container{
  color: #24292e !important;
  background: #fff !important;
  height: 465px !important;
  /* width: 700px !important; */
  border: none !important;
  box-shadow: 0 0px 4px rgba(0,0,0,0.157), 0 0px 4px rgba(0,0,0,0.227);
}
.show{
  display: block;
}
.not-show{
  display: none;
}
.box-title{
  color: $hui-hei;
  line-height: 32px;
}
.tags-box{
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
.el-radio.is-bordered+.el-radio.is-bordered {
  margin-right: 10px;
  margin-left: 0px;
}
.category-radio-box{
  label {
    background: white;
  }
  margin-top: 10px;
}
.radio-box{
  margin-top: 10px;
}
.confirm-button{
  margin-top: 10px;
}
</style>
