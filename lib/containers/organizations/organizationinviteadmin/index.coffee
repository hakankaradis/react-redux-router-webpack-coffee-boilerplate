React = require 'react'
{ connect } = require 'react-redux'

OrganizationInviteAdminView = require 'components/organizations/organizationinviteadmin'


class OrganizationInviteAdmin extends React.Component

  # componentDidMount: ->

  #   if @props.selectedOrganization
  #     @props.fetchOrganizationOwners()

  render: ->

    <OrganizationInviteAdminView {...@props} />


mapStateToProps = (state) ->

  selectedOrganization: state.selectedOrganization
  selectedOrganizationAdmins: state.selectedOrganizationAdmins


mapDispatchToProps = (dispatch) ->

  {}


module.exports = connect(
  mapStateToProps
  mapDispatchToProps
)(OrganizationInviteAdmin)
