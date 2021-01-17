const gitSha = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString()
  .trim(); // 这个是获取提交版本的记录
const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

process.env.SENTRY_RELEASE_VERSION = gitSha;

module.exports = {
  // publicPath: './',
  // 之前使用 “./” 为了支持cordova打包后可以运行。 现在router用history模式， 导致二级路由报错。所以暂时修改为 “/”
  publicPath: '/',
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
  devServer: {
    port: 8000
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // sentry upload sourcemap
      config.plugin('sentry').use(SentryWebpackPlugin, [
        {
          ignore: ['node_modules'],
          include: './dist', // 上传dist文件的js
          configFile: './.sentryclirc', // 配置文件地址
          release: process.env.SENTRY_RELEASE_VERSION // 版本号
        }
      ]);

      // gzip 压缩
      config.plugin('compression').use(CompressionPlugin, [
        {
          test: /.(js|css|svg|png|jpg|jpeg|woff|woff2|ttf|eot|json|html)$/, // 正在匹配需要压缩的文件后缀
          threshold: 5 * 1024 // 大于5kb的会压缩
        }
      ]);
    }
  }
};
