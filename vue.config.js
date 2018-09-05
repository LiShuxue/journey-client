module.exports = {
    css: {
        loaderOptions: {
            // 引入全局的scss
            sass: {
                data: `@import "@/assets/style/base.scss";`
            }
        },
    },
    devServer: {
        proxy: {
            '/api/*': {
                target: 'http://localhost:4000'
            }
        }
    }
}