<template>
  <div class="edit">
    <div class="choose-editor">
      <el-button type="info" @click="chooseMarkdown">Mardown编辑器</el-button>
      <el-button type="info" @click="chooseEdit">富文本编辑器</el-button>
    </div>

    <div :class="isMarkdown ? 'show' : 'not-show'">
      <mavon-editor class="markdown-editor-size" @change="markdownContentChange" @save="markdownContentSave" :subfield="showParseText" placeholder=" "></mavon-editor>
    </div>
    <div :class="isMarkdown ? 'not-show' : 'show'">
      <div ref="wangeditor"></div>
    </div>

    <el-button type="info" class="confirm-button" @click="getContent">查看内容</el-button>
  </div>
</template>

<script>
import WangEditor from 'wangeditor'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  data () {
    return {
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
    getContent () {
      if (this.isMarkdown) {
        alert(this.markdownContent)
      } else {
        alert(this.wangeditorContent)
      }
    }
  }
}
</script>

<style>
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
.confirm-button{
  margin-top: 10px;
}
</style>
