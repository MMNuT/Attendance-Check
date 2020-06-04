const bodyParser = require('body-parser')
const routesMaps = require('./index.js')


module.exports = app => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  routesMaps.forEach(route => route(app))
}