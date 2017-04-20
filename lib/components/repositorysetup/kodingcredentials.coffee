React = require 'react'

InputBox = require 'components/inputbox'
InitialState = { showLoader: no, groupName: '', username: '', password: '', provider: 'aws', showLoading: no }
Meta = require 'components/meta'
ListView = require 'components/listview'
Button = require 'components/button'
styles = require './styles.styl'


content = "We use Koding to build your test environment so you need to put your
Koding credentials. If you don’t have Koding account, please create one. Learn more about Koding here."


class KodingCredentials extends React.Component


  constructor: (props) ->

    super props

    @state = InitialState


  inputOnChange: (type, event) ->

    @setState { "#{type}": event.target.value.trim() }


  onSubmit: ->

    @setState { showLoader: yes }

    kodingCreds =
      uid: @props.orgUser.uid
      groupName: @state.groupName
      username: @state.username
      password: @state.password
      provider: @state.provider
      organization: @props.selectedOrganization
      repo: @props.selectedRepo

    @clearState()

    @props.signInKoding kodingCreds


    @setState { showLoading: yes }


  clearState: ->

    @setState InitialState


  render: ->

    return <Loading />  if @state.showLoader

    <div className={styles.kodingcredentials}>
      <Meta title='Koding SignIn' description={content} />
      <form onSubmit={@onSubmit.bind this} className={styles.form}>
        <InputBox value={@state.groupName}
          onChange={@inputOnChange.bind this, 'groupName'}
          placeholder='Enter your teamname...' />
        <InputBox value={@state.username}
          onChange={@inputOnChange.bind this, 'username'}
          placeholder='Enter your username...' />
        <InputBox type='password' value={@state.password}
          onChange={@inputOnChange.bind this, 'password'}
          placeholder='Enter your password...' />
        <InputBox type='text' value={@state.provider}
          onChange={@inputOnChange.bind this, 'provider'}
          placeholder='Enter your cloud provider...' />
        <Button title='Sign In to Koding' onClick={@onSubmit.bind this} bg='blue' />
      </form>
      <div className={styles.kodinglinks}>
        <div>Don’t have Koding account?</div>
        <div>Forgot your password?</div>
        <div>Forgot your team name?</div>
      </div>
    </div>

module.exports = KodingCredentials
