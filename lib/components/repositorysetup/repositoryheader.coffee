React = require 'react'
styles = require './styles.styl'
ToolTip = require 'components/tooltip'


RepositoryHeader = (props) ->

  { selectedRepo } = props

  { webhook, hasToken, koding: { stack } } = props.repoSetup

  repoStats =
    "Koding Integration": hasToken
    "Stack Template": stack?.id?
    "Webhook" : webhook?.id?

  repoReady = no
  if hasToken and webhook?.id? and stack?.id?
    repoReady = yes

  switchClassName = styles.switch
  switchClassName = "#{styles.switch} #{styles.notready}" unless repoReady



  <div className={styles.repositoryheader}>
    <div className={styles.reponame}>{selectedRepo}</div>
    <div className={styles.publish}>
      <label className={switchClassName}>
        <input type='checkbox' />
        <div className={styles.slider}></div>
      </label>
      <div className={styles.switchinfo}>
        Publish     |      This repository is not setup yet. Please complete the setup below to publish it.
      </div>
      <ToolTip>
        <RepoStatus repoStats={repoStats} />
      </ToolTip>
    </div>
  </div>


module.exports = RepositoryHeader

RepoStatus = ({repoStats}) ->

  <div className={styles.repostat}>
    {
      Object.keys(repoStats).map (name) ->
        value = repoStats[name]
        statClassName = "#{styles.fail}"
        statClassName = "#{styles.success}" if value
        <div key={name} className={statClassName}>
          <label>{name}</label>
        </div>
    }
  </div>