React = require 'react'
{ connect } = require 'react-redux'
{ browserHistory } = require 'react-router'
# KodingCredentials = require './kodingcredentials'
# KodingSignInSuccess = require './kodingsiginsuccess'
# KodingCreateStackTemplate = require './kodingcreatestacktemplate'


Actions = require 'redux/actions'

RepositorySetup = require 'components/repositorysetup'

# koding      :
  # provider  : provider
  # groupName : groupName
  # stack     :
  #   url     : ''
  #   error   : ''
  #   id      : ''
  #   machineStatus: ''


mapStateToProps = (state) ->

  orgUser: state.orgUser
  repoSetup: state.repoSetup
  selectedOrganization: state.selectedOrganization
  selectedRepo: state.selectedRepo
  showLoader: state.showLoader


mapDispatchToProps = (dispatch) ->

  createStackTemplate: () -> dispatch Actions.createStackTemplate()
  signInKoding: (kodingCreds) -> dispatch Actions.signInKoding kodingCreds
  checkStackStatus: ->
    dispatch Actions.toggleLoader yes
    dispatch Actions.checkStackStatus()
  addWebhook: -> dispatch Actions.addWebhook()
  toggleLoader: (show = no) -> dispatch Actions.toggleLoader show
  push: (path) -> browserHistory.push path


module.exports = connect(
  mapStateToProps
  mapDispatchToProps
)(RepositorySetup)
