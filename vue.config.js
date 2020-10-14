module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    open: true, // 启动项目后自动开启浏览器
    overlay: { // 是否开启协议名,如果开启会发出警告
      warnings: false,
      errors: false
    },
    host: '0.0.0.0',
    port: 3330
  }
}
