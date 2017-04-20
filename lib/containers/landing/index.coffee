React = require 'react'
{ connect } = require 'react-redux'
{ browserHistory } = require 'react-router'

Actions = require 'redux/actions'

Landing = require 'components/landing'

mapStateToProps = (state) ->

  orgUser: state.orgUser
  authenticatedUser: state.authenticatedUser
  landingToggle: state.landingToggle


mapDispatchToProps = (dispatch) ->

  signOut: -> dispatch Actions.userSignedOut()
  back: -> browserHistory.goBack()
  push: (path) -> browserHistory.push path
  toggleLanding: (toggle) -> dispatch Actions.toggleLanding toggle
  connectWithGithub: -> Actions.connectWithGithub()


module.exports = connect(
  mapStateToProps
  mapDispatchToProps
)(Landing)
