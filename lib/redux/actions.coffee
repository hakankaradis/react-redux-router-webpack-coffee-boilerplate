requests = require 'requests'
firebase = require 'firebase/app'

ActionType = require './actiontype'
{ auth } = require 'firebasedb'
{ browserHistory } = require 'react-router'


module.exports = Actions =

  ###
    Organization Related Action
  ###

  fetchOrganizations: (uid) -> (dispatch, getState) ->

    { uid } = getState().orgUser  if not uid and getState()

    action =
      request: -> requests.fetchOrganizations uid
      types: ActionType.FETCH_ORGANIZATIONS

    return action  unless dispatch
    dispatch action


  fetchOrganizationOwners: (uid, orgName) ->

    request: -> requests.fetchOrganizationOwners uid, orgName
    types: ActionType.FETCH_ORGANIZATION_OWNERS


  selectedOrganization: (orgName) ->

    data: orgName
    type: ActionType.ORGANIZATION_SELECT_SUCCESS

  ###
    Repositories Related Actions
  ###

  fetchRepositories: (uid, orgName) ->

    request: -> requests.fetchRepositories uid, orgName
    types: ActionType.FETCH_REPOSITORIES


  selectedRepositories: (uid, orgName) ->

    request: -> requests.selectedRepositories uid, orgName
    types: ActionType.SELECTED_REPOSITORIES


  repositorySetup: (uid, orgName, repo) -> (dispatch, getState) ->

    if getState()
      console.log 'getState', getState()
      { selectedRepo: repo, selectedOrganization: orgName } = getState()


    action =
      request: -> requests.repositorySetup uid, orgName, repo
      types: ActionType.REPOSITORY_SETUP


    return action  unless dispatch
    dispatch action


  selectedRepository: (repo) ->

    data: repo
    type: ActionType.REPOSITORY_SELECT_SUCCESS


  createStackTemplate: () -> (dispatch, getState) ->

    { selectedRepo: repo, selectedOrganization: organization, orgUser: { uid } } = getState()
    provider = 'aws'

    dispatch
      request: -> requests.createStackTemplate uid, organization, repo, provider
      types: ActionType.REPOSITORY_SETUP



  ###
    User Authentication Related Action
  ###

  connectWithGithub: ->

    provider = new firebase.auth.GithubAuthProvider()
    provider.addScope 'user'
    provider.addScope 'repo'
    provider.addScope 'admin:org'
    auth.signInWithRedirect provider


  userSignedIn: (user) ->

    data: user
    type: ActionType.USER_AUTHENTICATION.SUCCESS


  userSignedOut: ->

    request : -> auth.signOut()
    types   : ActionType.USER_AUTHENTICATION


  authenticateUser: (user) ->

    request: -> requests.authenticate user
    types: ActionType.USER_AUTHENTICATION


  authenticateUserWithCredentials: (user, credential) ->

    request: -> requests.authenticateUserWithCredentials user, credential
    types: ActionType.USER_AUTHENTICATION


  authenticate: (user, callback) ->

    requests.authenticate(user).then (userInfo) ->
      { authenticated } = userInfo

      return callback { type: ActionType.USER_AUTHENTICATION.SUCCESS, data: userInfo }  if authenticated

      auth.getRedirectResult().then (result) ->
        if accessToken = result.credential?.accessToken
          auth.signInWithCredential result.credential
          user.isWelcomeModalDisplayed = no
          callback Actions.authenticateUserWithCredentials user, result.credential

  ###
    UI ACTIONS
  ###

  onChangeRepoSelection: (repo) -> (dispatch, getState) ->

    { selectedRepositories } = getState()
    { name } = repo

    if selectedRepositories?[name]
      delete selectedRepositories[name]
    else
      selectedRepositories[name] = repo

    dispatch { data: Object.assign({}, selectedRepositories), type: ActionType.SELECTED_REPOSITORIES.SUCCESS }


  activateSelectedRepo: (repo) -> (dispatch, getState) ->

    { orgUser: { uid }, selectedOrganization } = getState()



    dispatch
      request: -> requests.activateRepositories uid, repo
      types: ActionType.REPOSITORY_SETUP

    browserHistory.replace "/#{selectedOrganization}/#{repo.name}/setup"

  signInKoding: (kodingCreds) ->

    request: -> requests.signInKoding kodingCreds
    types: ActionType.REPOSITORY_SETUP


  checkStackStatus: -> (dispatch, getState) ->

    { orgUser: { uid }, selectedOrganization, selectedRepo } = getState()

    dispatch
      request: -> requests.checkStackStatus uid, selectedOrganization, selectedRepo
      types: ActionType.REPOSITORY_SETUP


  addWebhook: -> (dispatch, getState) ->

    { orgUser: { uid }, selectedOrganization, selectedRepo } = getState()

    dispatch
      request: -> requests.addWebhook uid, selectedOrganization, selectedRepo
      types: ActionType.REPOSITORY_SETUP


  toggleLanding: (toggle) ->

    data: toggle
    type: ActionType.LANDING_TOGGLE_SUCCESS

  toggleLoader: (show = no) ->

    data: show
    type: ActionType.SHOW_LOADER_TOGGLE_SUCCESS

