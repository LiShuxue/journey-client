<template>
  <div class="edit">
    <el-input placeholder="文章标题" v-model="title" class="input-box">
      <template slot="prepend">文章标题：</template>
    </el-input>
    <el-input placeholder="文章摘要" v-model="subTitle" class="input-box">
      <template slot="prepend">文章摘要：</template>
    </el-input>

    <div class="choose-editor">
      <el-button type="info" @click="chooseMarkdown" size="small">Mardown编辑器</el-button>
      <el-button type="info" @click="chooseEdit" size="small">富文本编辑器</el-button>
    </div>

    <div :class="isMarkdown ? 'show' : 'not-show'">
      <mavon-editor class="markdown-editor-size" @change="markdownContentChange" @save="markdownContentSave" :subfield="showParseText" placeholder=" "></mavon-editor>
    </div>
    <div :class="isMarkdown ? 'not-show' : 'show'">
      <div ref="wangeditor"></div>
    </div>

    <div class="category-radio-box">
      <span class="box-title">分类：</span>
      <el-radio-group v-model="category" size="small">
        <el-radio v-for="category in categorys" :key="category" :label="category" border>{{category}}</el-radio>
      </el-radio-group>
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
      inputVisible: false,
      inputValue: '',
      isMarkdown: true,
      wangeditor: null,
      wangeditorContent: '',
      markdownPlaceholder: '',
      markdownContent: '',
      showParseText: false
    }
  },
  components: {
    mavonEditor
  },
  mounted () {
    this.wangeditor = new WangEditor(this.$refs.wangeditor)
    this.initWangEditorConfig()
    this.wangeditor.create()
  },
  methods: {
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
      this.markdownContent = html
    },
    markdownContentSave (markdown, html) {
      this.markdownContent = html
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
      this.axios.post(API.requireAuth.publish, {
        blog: {
          title: this.title,
          subTitle: this.subTitle,
          content: this.isMarkdown ? this.markdownContent : this.wangeditorContent,
          isOriginal: this.isOriginal,
          category: this.category,
          tags: this.tags
        }
      }).then(response => {
        this.$message.success(response.data.successMsg)
      }).catch(err => {
        this.$message.error(err.data.errMsg || err.data)
      })
    }
  }
}
</script>

<style lang="scss">
.input-box{
  margin-bottom: 10px;
}
.choose-editor{
  margin-bottom: 10px;
}
.markdown-editor-size{
  height: 500px;
  /* width: 600px; */
}
.w-e-toolbar{
  color: #24292e !important;
  background: #fff !important;
  height: 35px !important;
  /* width: 600px !important; */
  border: none !important;
  box-shadow: 0 0px 4px rgba(0,0,0,0.157), 0 0px 4px rgba(0,0,0,0.227);
}
.w-e-text-container{
  color: #24292e !important;
  background: #fff !important;
  height: 465px !important;
  /* width: 600px !important; */
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
