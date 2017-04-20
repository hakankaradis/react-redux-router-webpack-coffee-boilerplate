React = require 'react'
{ connect } = require 'react-redux'
{ browserHistory } = require 'react-router'

Actions = require 'redux/actions'
Header = require 'components/header'

mapStateToProps = (state) ->

  orgUser: state.orgUser
  authenticatedUser: state.authenticatedUser


mapDispatchToProps = (dispatch) ->

  signOut: -> dispatch Actions.userSignedOut()



module.exports = connect(
  mapStateToProps
  mapDispatchToProps
)(Header)

