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
        console.log(response.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
</style>
