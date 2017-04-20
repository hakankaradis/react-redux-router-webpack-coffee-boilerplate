React = require 'react'
{ browserHistory } = require 'react-router'
Button = require 'components/button'
styles = require './styles.styl'
ListView = require 'components/listview'


class OrganizationList extends React.Component


  render: ->

    return <ListView.Loading />  unless @props.organizations

    <ListView>
      {
        Object.keys(@props.organizations).map (orgName) =>
          organization = @props.organizations[orgName]
          { role, avatarUrl } = organization
          buttonTitle = if role is 'admin' then 'Continue' else 'Invite'
          buttonType = if role is 'admin' then 'primary' else 'secondary'
          buttonOnClick = (name, role) ->
            if role is 'admin'
            then browserHistory.push "#{name}/selectRepositories"
            else browserHistory.push "#{name}/invite"

          <ListView.Item key={orgName}>
            <ListView.Content src={avatarUrl} mainText={orgName.toUpperCase()} secText={role} />
            <ListView.Action>
              <Button title={buttonTitle} onClick={-> buttonOnClick(orgName, role)} bg='white' size='small' type={buttonType} />
            </ListView.Action>
          </ListView.Item>
      }
    </ListView>


module.exports = OrganizationList

