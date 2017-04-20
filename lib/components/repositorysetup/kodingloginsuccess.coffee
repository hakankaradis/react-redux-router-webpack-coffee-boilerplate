React = require 'react'
styles = require './styles'

Loading = require 'components/loading'
Meta = require 'components/meta'
Button = require 'components/button'

content = "You have succesfully logged in to your Koding account.
  We have created a stack for your test environment on Koding.
  Please click the link or button and customize your stack
  based on your repository and build it. Make sure your test environment is running
  in this stack."

title = 'Stack Template Succesfully Created'


KodingLoginSuccess = (props) ->

  { checkStackStatus, repoSetup: { koding: { stack } } } = props

  content = "Your stack has not been built yet. Please click the link or the button
    and customize your stack based on your repository and build it."   if stack?.machineStatus

  title = 'Your Test Environment Stack is not Ready!'  if stack?.machineStatus

  customizeStack = ->
    window.open stack.url, '_blank'


  <div className={styles.loginsuccessmodal}>
    <Meta title={title} description={content} />
    <div className={styles.stackurl}>
      Stack URL: <a target='_blank' href={stack.url}>{stack.url}</a>
    </div>
    {
      if stack?.machineStatus is 'Not Initialized'
        <div className={styles.notinitializedstack}>
          Your stack is not initialized yet. Please click the Customize The Stack
          and edit your stack template and build it.
        </div>
    }
    <Button className={styles.button} title='Customize The Stack' onClick={customizeStack} bg='blue' />
    <Button className={styles.button} title='Check Stack Status' onClick={checkStackStatus} bg='blue' />
  </div>


module.exports = KodingLoginSuccess
