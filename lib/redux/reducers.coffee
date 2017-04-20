{ combineReducers } = require 'redux'
ActionType = require './actiontype'


###
  Accepts:
    InitialState and ActionType
  Return:
    payload data as a state
###

reducer = (InitialState, ActionType) -> (state = InitialState, action) ->

  { type, data } = action
  switch type
    when ActionType
      data = InitialState  unless data
      return data
    else state


module.exports = combineReducers
  orgUser: reducer null, ActionType.USER_AUTHENTICATION.SUCCESS #authenticatedUser
  organizations: reducer null, ActionType.FETCH_ORGANIZATIONS.SUCCESS #organizations
  selectedOrganization: reducer null, ActionType.ORGANIZATION_SELECT_SUCCESS #selectedOrganization
  selectedOrganizationAdmins: reducer [], ActionType.FETCH_ORGANIZATION_OWNERS.SUCCESS #selectedOrganizationAdmins
  repositories: reducer null, ActionType.FETCH_REPOSITORIES.SUCCESS #repositories
  selectedRepo: reducer null, ActionType.REPOSITORY_SELECT_SUCCESS #selectedRepo
  selectedRepositories: reducer {}, ActionType.SELECTED_REPOSITORIES.SUCCESS #selectedRepositories
  repoSetup: reducer null, ActionType.REPOSITORY_SETUP.SUCCESS #repoSetup
  landingToggle: reducer 'tester', ActionType.LANDING_TOGGLE_SUCCESS
  showLoader: reducer no, ActionType.SHOW_LOADER_TOGGLE_SUCCESS
