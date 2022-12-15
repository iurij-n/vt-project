const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api/v1/': {
        target: 'https://dummy.restapiexample.com/',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
