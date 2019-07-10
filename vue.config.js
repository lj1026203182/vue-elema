module.exports = {
  publicPath: '/elema', // 打包文件相对路径
  devServer: {
    open: true,
    // proxy: {
    //   // 配置跨域
    //   '/api': {              //  '/api'相当于代表  http://localhost/Graduation_Thesis  可自行修改名字
    //     target: '', //我们需要请求的主要文件夹地址
    //     changeOrigin: true, //是否跨域
    //     pathRewrite: {
    //       '^/api': '' //路径重写
    //     }
    //   }
    // }
  }
}
