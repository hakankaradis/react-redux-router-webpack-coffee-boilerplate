React = require 'react'
Meta = require 'components/meta'
Button = require 'components/button'
styles = require './styles.styl'
{ browserHistory } = require 'react-router'

KodingLoginSuccess = require './kodingloginsuccess'

KodingSignInSuccess = (props) ->

  { webhook, hasToken, koding: { stack } } = props.repoSetup

  if hasToken and webhook?.id and stack?.id
    return <AllDone {...props} />


  <div className={styles.signinsuccess}>
    {
      if stack?.machineStatus isnt 'Not Initialized' and stack?.machineStatus
        <TestMyStack {...props} />
      else if stack?.id and stack?.url
        <KodingLoginSuccess {...props} />
    }
  </div>


module.exports = KodingSignInSuccess

AllDone = ({ push, repoSetup: { webhook, hasToken, koding: { stack } }, selectedRepo, selectedOrganization }) ->

  content = "Everything looks great. Your test environment for this repo is ready.
    Now you need to publish this repository right above in order to create your test stak for tester
    when the repository got any git push request."

  hookUrl = "https://github.com/#{selectedOrganization}/#{selectedRepo}/settings/hooks/#{webhook.id}"

  <div className={styles.alldone}>
    <Meta title='Congrats! Your Repository is Ready' description={content} />
    <Button className={styles.gotoreposbutton} title='Go to the Repository List' onClick={-> push "/#{selectedOrganization}/selectRepositories"} bg='blue' />
  </div>


LoginSuccessModal = (props) ->

  { checkStackStatus, repoSetup: { koding: { stack } } } = props

  content = "You have succesfully logged in to your Koding account.
    We have created a stack for your test environment on Koding.
    Please click the link or button and customize your stack
    based on your repository and build it. Make sure your test environment is running
    in this stack."

  content = "Your stack has not been built yet. Please click the link or the button
    and customize your stack based on your repository and build it."   if stack?.machineStatus

  title = 'Stack Template Succesfully Created'
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


TestMyStack = (props) ->

  { addWebhook, repoSetup: { webhook, koding: { stack } } } = props

  content = 'Your stack template is ready. Now you can add a webhook to your repository
    by clicking the button. This webhook will be triggered when there is a new push on git.
    This webhook will create a new stack in your Koding team. Testers will use this stack
    to test your product.'

  title = 'Your Stack is Ready'

  if webhook and webhook is no
    content = 'This repository is set before, please delete the old one and try again.'
    title = 'There is already a webhook!'

  <div className={styles.testmystack}>
    <Meta title={title} description={content} />
    <Button className={styles.button}
      title='Add Web hook to Repo' onClick={addWebhook} bg='blue' />
  </div>


LoginFailModal = ->

  content = "We couldn’t unable to log you in to your Koding account.
    The credentials you have entered might not be a match. Please try again."

  <div>
    <Meta title='An Error Occured' description={content} />
    <div> If you can not login again, you can <a>get in contact with us.</a></div>
    <Button title='Close the Message' onClick={-> console.log 'close the modal'} />
  </div>


StackSuccessModal = ->

  content = "Everything looks great. Your test environment for this repo is ready.
    Now it is time to add test files to your repository.
    We will use these files to generate test suits. "

  <div>
    <Meta title='Success!' description={content} />
    <Button title='Continue' onClick={-> console.log 'continue on click'} />
  </div>


StackFailModal = ->

  content = "Please make sure the stack is up and running."

  <div>
    <Meta title='An Error Occured' description={content} />
    <div> Stack URL: <a>{stack.url}</a> </div>
    <Button title='Test the Stack Again' onClick={-> console.log 'test the stack again'} />
  </div>
