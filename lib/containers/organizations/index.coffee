React = require 'react'
{ connect } = require 'react-redux'

Actions = require 'redux/actions'
OrganizationsView = require 'components/organizations'

class Organizations extends React.Component

  render: ->

    <OrganizationsView {...@props} />


mapStateToProps = (state) ->

  orgUser: state.orgUser
  organizations: state.organizations


mapDispatchToProps = (dispatch) ->

  fetchOrganizations: ->
    console.log 'fetchOrganizations'
    #dispatch Actions.fetchOrganizations()


module.exports = connect(
  mapStateToProps
  mapDispatchToProps
)(Organizations)
