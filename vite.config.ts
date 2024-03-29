import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteCompression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';
import { sentryVitePlugin } from '@sentry/vite-plugin';

const plugins = [];

// 打包生产环境才引入的插件
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    // 打包依赖分析
    visualizer({
      open: true,
      gzipSize: true,
    })
  );

  plugins.push(
    // gzip压缩
    viteCompression({
      threshold: 5 * 1024,
    })
  );

  plugins.push(
    // sentry 收集源码
    sentryVitePlugin({
      org: 'lishuxue',
      project: 'journey-client',
      authToken: 'c132a7233b5d40008e44e08da853c2b4a4165268b2244163a178d306ac777241',
    })
  );
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    sourcemap: true,
  },
  plugins: [vue(), vueJsx(), ...plugins],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/style/base.scss";`,
      },
    },
  },
  server: {
    port: 8000,
    proxy: {
      '/blog-api': {
        target: 'http://localhost:4000',
        // rewrite: (path) => {
        //   const newPath = path.replace('/blog-api', '');
        //   return newPath;
        // },
        secure: false,
        changeOrigin: true,
        xfwd: true, // 添加x-forward headers
      },
      // 因为one上的图片设置了防外链，所以我们通过反向代理+手动设置host referer来获取图片
      '/oneinfo': {
        target: 'https://image.wufazhuce.com',
        rewrite: (path) => path.replace(/^\/oneinfo/, ''),
        secure: false,
        changeOrigin: true,
        headers: {
          host: 'https://image.wufazhuce.com',
          referer: 'https://image.wufazhuce.com',
        },
      },
    },
  },
});
