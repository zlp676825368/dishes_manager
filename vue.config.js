module.exports = {
    devServer: {
        open: true //浏览器自动打开页面
        // host: "0.0.0.0", //如果是真机测试，就使用这个IP
        // port: 8911,
        // https: false,
        // hotOnly: false, //热更新（webpack已实现了，这里false即可）
    },

    configureWebpack: {
        resolve: {
            extensions: [],
            alias: {
                'assets': '@/assets',
                'views': '@/views',
                'components': '@/components',
                'network': '@/network',
                'dialog': '@/dialog'
            }
        }
    }
}