App = require 'containers/app'
Actions = require 'redux/actions'

{ browserHistory } = require 'react-router'

###
  Containers
###
Organizations = require 'containers/organizations'
OrganizationInviteAdmin = require 'containers/organizations/organizationinviteadmin'
SelectRepositories = require 'containers/selectrepositories'
RepositorySetup = require 'containers/repositorysetup'

{ auth } = require 'firebasedb'

module.exports = routes = (store) ->
  path        : '/'
  component   : App
  childRoutes : [
    {
      path: 'organizations'
      component: Organizations
      onEnter: ->
        unless auth.currentUser
          return browserHistory.push '/'

        { uid } = auth.currentUser
        store.dispatch Actions.fetchOrganizations uid
    }
    {
      path: ':orgName/invite'
      component: OrganizationInviteAdmin
      onEnter: (nextState) ->

        unless auth.currentUser
          return browserHistory.push '/'

        { uid } = auth.currentUser
        { orgName } = nextState.params
        store.dispatch Actions.selectedOrganization orgName
        store.dispatch Actions.fetchOrganizationOwners uid, orgName
    }
    {
      path: ':orgName/selectRepositories'
      component: SelectRepositories
      onEnter: (nextState) ->

        unless auth.currentUser
          return browserHistory.push '/'

        { uid } = auth.currentUser
        { orgName } = nextState.params

        store.dispatch Actions.selectedOrganization orgName
        store.dispatch Actions.fetchRepositories uid, orgName
    }
    {
      path: ':orgName/:repo/setup'
      component: RepositorySetup
      onEnter: (nextState) ->

        unless auth.currentUser
          return browserHistory.push '/'

        { uid } = auth.currentUser
        { orgName, repo } = nextState.params

        store.dispatch Actions.selectedOrganization orgName
        store.dispatch Actions.selectedRepository repo
        store.dispatch Actions.repositorySetup uid, orgName, repo
    }
    {
      path      : '*'
      component : App
    }

  ]
