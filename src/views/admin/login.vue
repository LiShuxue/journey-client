<template>
  <div class="login"
    v-loading="loading"
    element-loading-text="正在登录..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="login-wrapper">
      <el-input placeholder="请输入用户名" v-model="username" class="input-box">
        <template slot="prepend">用户名：</template>
      </el-input>
      <el-input placeholder="请输入密码" v-model="password" type="password" class="input-box" @keyup.enter.native="login">
        <template slot="prepend">密&nbsp;&nbsp;&nbsp;&nbsp;码：</template>
      </el-input>
      <el-button type="info" class="button-login" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
import API from '@/ajax/api.js'
import SHA256 from 'crypto-js/sha256'
export default {
  data () {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
    login () {
      this.sentry.addBreadcrumb('views/admin/login.vue --> methods: login');

      this.loading = true
      this.axios.post(API.notRequireAuth.login, {
        username: this.username,
        password: SHA256(this.password).toString()
      }).then(response => {
        this.loading = false
        this.$message.success(response.data.successMsg)
        if (response.data.access_token && response.data.refresh_token && response.data.username) {
          this.$store.dispatch('saveAccessTokenAction', response.data.access_token)
          this.$store.dispatch('saveRefreshTokenAction', response.data.refresh_token)
          this.$store.dispatch('saveUsernameAction', response.data.username)
        }

        // 根据传过来的参数，跳到不同的页面
        let redirect = decodeURIComponent(this.$route.query.redirect)
        if (redirect !== 'undefined') {
          this.$router.push(redirect)
        } else {
          this.$router.push('/admin')
        }
      }).catch(err => {
        this.sentry.captureException(err)

        this.loading = false
        err && this.$message.error(err.data.errMsg || err.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-wrapper{
    background: $hui-bai;
    padding: 20px;
    border-radius: 10px;
    max-width: 400px;

    .input-box{
      margin-bottom: 15px;
    }

    .button-login{
      width: 100%;
    }
  }
}
</style>
