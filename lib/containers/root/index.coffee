React = require 'react'
{ Provider } = require 'react-redux'
{ Router } = require 'react-router'

{ PropTypes } = React

Root = ({ store, history, routes }) -> (
  <Provider store={store}>
    <Router history={history} routes={routes}/>
  </Provider>
)

Root.propTypes =
  store   : PropTypes.object.isRequired
  history : PropTypes.object.isRequired
  routes  : PropTypes.object.isRequired

module.exports = Root
