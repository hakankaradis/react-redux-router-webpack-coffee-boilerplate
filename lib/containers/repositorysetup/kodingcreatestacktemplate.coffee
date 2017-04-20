$ = require 'jquery'
React = require 'react'
{ connect } = require 'react-redux'

Actions = require 'redux/actions'

KodingCreateStackTemplate = require 'components/repositorysetup/kodingcreatestacktemplate'


mapStateToProps = (state) -> {}


mapDispatchToProps = (dispatch) ->

  createStackTemplate: () ->
    dispatch Actions.createStackTemplate()


module.exports = connect(
  mapStateToProps
  mapDispatchToProps
)(KodingCreateStackTemplate)
