React = require 'react'
ReactDOM = require 'react-dom'
Root = require 'containers/root'

store = require 'redux/store'
routes = require('./routes') store

{ Provider } = require 'react-redux'
{ browserHistory } = require 'react-router'
{ observableFromStore } = require('redux-rx')

render = -> ReactDOM.render(
  <Root store={store} history={browserHistory} routes={routes} />,
  document.getElementById('container')
)

{ auth } = require 'firebasedb'
Actions = require 'redux/actions'

auth.onAuthStateChanged (user) ->
  if user
    Actions.authenticate user, (action) ->
      store.dispatch action
      if action?.data?
        browserHistory.push '/organizations'

  render()
