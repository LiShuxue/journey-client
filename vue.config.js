const gitSha = require('child_process').execSync('git rev-parse HEAD').toString().trim() // 这个是获取提交版本的记录
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

process.env.SENTRY_RELEASE_VERSION = gitSha

module.exports = {
  publicPath: './',
  // 关闭production 的sourcemap
  // productionSourceMap: false,
  css: {
    loaderOptions: {
      // 引入全局的scss
      sass: {
        prependData: `@import "@/assets/style/base.scss";`
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // sentry upload sourcemap
      config.plugin('sentry').use(SentryWebpackPlugin, [{
        ignore: ['node_modules'],
        include: './dist', // 上传dist文件的js
        configFile: './.sentryclirc', // 配置文件地址
        release: process.env.SENTRY_RELEASE_VERSION // 版本号
      }])
    }
  }
}
