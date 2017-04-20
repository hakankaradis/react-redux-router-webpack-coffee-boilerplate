React = require 'react'
ListView = require 'components/listview'
Meta = require 'components/meta'
Button = require 'components/button'

content = "We can not access your organization’s GitHub account. You can invite admins below so that they can setup the test environment."
styles = require './styles.styl'


OrganizationInviteAdmin = (props) ->

  { selectedOrganizations, selectedOrganizationAdmins, selectedOrganization, back } = props

  <div className={styles.inviteadmin}>
    <Meta title="Invite Admins from #{selectedOrganization}" description={content} />
    <ListView>
    {
      selectedOrganizationAdmins.map (admin) ->
        { login, avatarUrl } = admin

        <ListView.Item key={login}>
          <ListView.Content src={avatarUrl} mainText={"@#{login}"} />
          <ListView.Action>
            <Button title='Send' onClick={-> console.log 'Invite'} bg='white' size='small' type='primary' />
          </ListView.Action>
        </ListView.Item>
    }
    </ListView>
    <Button className={styles.orglistbutton}
      title='Back to OrganizationList'
      onClick={back} bg='white' />
  </div>


module.exports = OrganizationInviteAdmin


AdminList = ({ admins }) ->

  return null  unless admins.length

  <div className='admins'>
    {
      admins.map (admin) ->
        { login, avatarUrl } = admin
        <div key={login}>
          {login} - {avatarUrl}
        </div>
    }
  </div>
