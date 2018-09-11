<template>
  <div class="home">
      this is after login
      <el-button type="info" @click="test">test</el-button>
  </div>
</template>

<script>
import API from '@/ajax/api.js'
export default {
  methods: {
    test () {
      this.axios.get(API.admin.test).then(response => {
        this.$message.success(response.data.successMsg)
      }).catch(err => {
        this.$message.error(err.data.errMsg || err.data)
      })
    }
  }
}
</script>

<style scoped>
</style>
