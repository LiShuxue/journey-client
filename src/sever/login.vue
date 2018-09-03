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
      <el-input placeholder="请输入密码" v-model="password" type="password" class="input-box">
        <template slot="prepend">密&nbsp;&nbsp;&nbsp;&nbsp;码：</template>
      </el-input>

      <div class="button-wrapper">
        <el-button type="info" class="button-clear" @click="clearData">清除</el-button>
        <el-button type="info" class="button-login" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false
    }
  },
  methods: {
    clearData() {
      this.username = '',
      this.password = ''
    },
    login() {
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
      }, 2000)
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

    .button-wrapper{
      display: flex;
      justify-content: center;

      .button-clear{
        margin-right: 100px;
      }
    }
  }
}
</style>
