const path = require('path')

const port = 5566
const title = 'hahahaha'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/testPath',
  devServer: {
    port,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://127.0.0.1:9999/',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
    // before: require('./mock/mock-server')
  },
  configureWebpack: {
    name: title
  },
  chainWebpack (config) {
    config.module.rule('svg')
      .exclude
      .add(resolve('src/icons'))
      .end()

    config.module.rule('icons')
      .test(/\.svg$/)
      .include
      .add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({ symbolId: 'icon-[name]' })
      .end()
  }
}
