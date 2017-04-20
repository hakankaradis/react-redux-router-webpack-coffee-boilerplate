$ = require 'jquery'
React = require 'react'
{ connect } = require 'react-redux'

Actions = require 'redux/actions'

KodingCredentials = require 'components/repositorysetup/kodingcredentials'


mapStateToProps = (state) -> {}


mapDispatchToProps = (dispatch) ->

  signInKoding: (kodingCreds) ->
    dispatch Actions.signInKoding kodingCreds


module.exports = connect(
  mapStateToProps
  mapDispatchToProps
)(KodingCredentials)
