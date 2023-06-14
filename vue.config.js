const CompressionPlugin = require('compression-webpack-plugin');

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
        implementation: require('sass'),
        additionalData: `@import "~@/assets/style/base.scss";`
      }
    }
  },
  devServer: {
    port: 8000,
    proxy: {
      '/blog-api': {
        target: 'http://localhost:4000',
        // pathRewrite: { '^/blog-api': '' },
        secure: false,
        changeOrigin: true,
        xfwd: true // 添加x-forward headers
      },
      // 因为one上的图片设置了防外链，所以我们通过反向代理+手动设置host referer来获取图片
      '/oneinfo': {
        target: 'http://image.wufazhuce.com',
        pathRewrite: { '^/oneinfo': '' },
        secure: false,
        changeOrigin: true,
        headers: {
          host: 'http://image.wufazhuce.com',
          referer: 'http://image.wufazhuce.com'
        }
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
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
