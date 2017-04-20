React = require 'react'
{ connect } = require 'react-redux'
{ browserHistory } = require 'react-router'
Actions = require 'redux/actions'
SelectRepositories = require 'components/selectrepositories'


mapStateToProps = (state) ->

  orgUser: state.orgUser
  repositories: state.repositories
  selectedOrganization: state.selectedOrganization
  selectedRepositories: state.selectedRepositories


mapDispatchToProps = (dispatch) ->

  onChangeRepoSelection: (repo) ->
    dispatch Actions.onChangeRepoSelection repo

  push: (path) -> browserHistory.push path
  activateSelectedRepo: (repo) ->
    dispatch Actions.activateSelectedRepo repo


module.exports = connect(
  mapStateToProps
  mapDispatchToProps
)(SelectRepositories)
