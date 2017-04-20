React = require 'react'
{ connect } = require 'react-redux'
{ browserHistory } = require 'react-router'

Actions = require 'redux/actions'
App = require 'components/app'

mapStateToProps = (state) ->

  orgUser: state.orgUser
  authenticatedUser: state.authenticatedUser

mapDispatchToProps = (dispatch) ->

  signOut: -> dispatch Actions.userSignedOut()
  back: -> browserHistory.goBack()
  push: (path) -> browserHistory.push path


module.exports = connect(
  mapStateToProps
  mapDispatchToProps
)(App)
