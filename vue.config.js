module.exports = {
  baseUrl: './',
  css: {
    loaderOptions: {
      // 引入全局的scss
      sass: {
        data: `@import "@/assets/style/base.scss";`
      }
    }
  }
}
