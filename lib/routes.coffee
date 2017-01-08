App = require 'containers/app'
Counter = require 'containers/counter'
Page1 = require 'containers/Page1'
Page2 = require 'containers/Page2'

module.exports = routes =
  path        : '/'
  component   : App
  indexRoute  :
    component : Counter
  childRoutes : [
    {
      path      : 'page1'
      component : Page1
    }
    {
      path      : 'page2'
      component : Page2
    }
  ]
