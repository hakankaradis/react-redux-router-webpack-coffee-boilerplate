React = require 'react'
{ connect } = require 'react-redux'

Actions = require 'redux/actions'
KodingSignInSuccess = require 'components/repositorysetup/kodingsigninsuccess'


mapStateToProps = (state) -> {}


mapDispatchToProps = (dispatch) ->

  checkStackStatus: -> dispatch Actions.checkStackStatus()
  addWebhook: -> dispatch Actions.addWebhook()


module.exports = connect(
  mapStateToProps
  mapDispatchToProps
)(KodingSignInSuccess)
