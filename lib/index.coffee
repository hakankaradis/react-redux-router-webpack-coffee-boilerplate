React = require 'react'
ReactDOM = require 'react-dom'
{ Provider } = require 'react-redux'
{ browserHistory } = require 'react-router'
Root = require 'containers/root'
store = require './store'
routes = require './routes'


ReactDOM.render(
  <Root store={store} history={browserHistory} routes={routes} />,
  document.getElementById('container')
)
