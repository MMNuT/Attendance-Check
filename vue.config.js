const path = require('path')

const port = 5566
const title = 'Attendance Check'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port
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

    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
    })

    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}
