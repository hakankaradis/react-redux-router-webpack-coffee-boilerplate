React = require 'react'
Meta = require 'components/meta'
Button = require 'components/button'
styles = require './styles.styl'
InputBox = require 'components/inputbox'
InitialState = { provider: 'aws' }

description = "We need you to select cloud provider to define virtual machines on the repository stack so that you can run the test environment. Koding supports AWS, Azure, Digital Ocean, Vagrant, Marathon and Softlayer."


class KodingCreateStackTemplate extends React.Component

  constructor: (props) ->

    super props

    @state = InitialState


  render: ->

    <div className={styles.createstacktemplate}>
      <Meta title='Select Cloud Provider' description={description} />
      <InputBox type='text' value={@state.provider}
          placeholder='Enter your cloud provider...' />
      <Button title='Continue' onClick={@props.createStackTemplate} bg='blue' />
    </div>


module.exports = KodingCreateStackTemplate
