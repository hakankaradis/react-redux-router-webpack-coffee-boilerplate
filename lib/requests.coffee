$ = require 'jquery'
serverUrl = 'https://us-central1-braveqa-214f6.cloudfunctions.net'


doReq = (url, data) -> new Promise (resolve, reject) ->
  options =
    url: "#{serverUrl}/#{url}"
    type: 'POST'
    data: data
    json: true
    success: resolve
    error: reject
    dataType: 'json'

  $.ajax options


module.exports = Requests =

  authenticateUserWithCredentials: (user, credential) ->
    { displayName, email, photoURL, uid } = user
    user = { displayName, email, photoURL, uid }

    doReq 'authenticateUserWithCredentials', { user, credential }

  authenticate: (user) ->

    { displayName, email, photoURL, uid } = user
    user = { displayName, email, photoURL, uid }
    doReq 'authenticateUser', { user }

  fetchOrganizations: (uid) ->

    doReq 'fetchOrganizations', { uid }

  fetchOrganizationOwners: (uid, orgName) ->

    doReq 'fetchOrganizationOwners', { uid, orgName }

  fetchRepositories: (uid, orgName) ->

    doReq 'fetchRepositories', { uid, orgName }

  activateRepositories: (uid, repo) ->

    doReq 'activateRepositories', { uid, repo }

  selectedRepositories: (uid, orgName) ->

    doReq 'selectedRepositories', { uid, orgName }

  repositorySetup: (uid, orgName, repo) ->

    doReq 'repositorySetup', { uid, orgName, repo }

  signInKoding: (userInfo) ->

    doReq 'signInKoding', userInfo

  createStackTemplate: (uid, orgName, repo) ->

    doReq 'createStackTemplate', { uid, orgName, repo }

  checkStackStatus: (uid, orgName, repo) ->

    doReq 'checkStackStatus', { uid, orgName, repo }


  addWebhook: (uid, orgName, repo) ->

    doReq 'addWebhook', { uid, orgName, repo }

  createStackTemplate: (uid, organization, repo, provider) ->

    doReq 'createStackTemplate', { uid, organization, repo, provider }
