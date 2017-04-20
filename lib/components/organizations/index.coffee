React = require 'react'
Modal = require 'react-modal'
{ Link } = require 'react-router'
Meta = require 'components/meta'
Step = require 'components/step'
OrganizationsList = require './organizationlist'
styles = require './styles.styl'

Button = require 'components/button'
Loading = require 'components/loading'

customStyles =
  content :
    top         : '50%'
    left        : '50%'
    right       : 'auto'
    bottom      : 'auto'
    marginRight : '-50%'
    transform   : 'translate(-50%, -50%)'

modalContent = "You are about to make your testing process awesome. It will take only a few steps to create your test environment. Select your organization and repositories and set them up. That's it!"
content = "Your organization list is below. If you are an owner, you can start to build test environment for that organization. Otherwise, you can invite owners."

noOrgContent = "We couldn’t find any organization on your GitHub account. You can go to GitHub and create one. Once create an organization, come back to the site and refresh the page to see the organization."
goToGithub = -> window.open('https://github.com/settings/organizations', '_blank')

class Organizations extends React.Component

  render: ->

    return <Loading />  unless @props.orgUser

    { displayName, isWelcomeModalDisplayed } = @props.orgUser

    <div className={styles.organizations}>
      {
        if @props.organizations and Object.keys(@props.organizations).length is 0
          <div className={styles.noorganization}>
            <Meta title='No Organization' description={noOrgContent} />
            <Button title='Go to GitHub'
              bg='blue' className={styles.gotogithub} onClick={goToGithub} />
          </div>
        else
          <div>
            <Step number=1 />
            <Meta title='Select an Organization' description={content} />
          </div>
      }
      <OrganizationsList organizations={@props.organizations} />
      <Modal isOpen={isWelcomeModalDisplayed} contentLabel='Modal' style={customStyles}>
        <Meta title="Welcome #{@props.orgUser.displayName}" description={modalContent} />
      </Modal>
      <img src={'/assets/city.svg'} className={styles.bgimage} />
    </div>

module.exports = Organizations

