React = require 'react'
styles = require './styles.styl'

Loading = require 'components/loading'
KodingCredentials = require './kodingcredentials'
KodingSignInSuccess = require './kodingsigninsuccess'
KodingCreateStackTemplate = require './kodingcreatestacktemplate'
RepositoryHeader = require './repositoryheader'


RepositorySetup = (props) ->

  return <Loading />  unless props.repoSetup

  { koding, testFiles, hasToken } = props.repoSetup

  <div className={styles.repositorysetup}>
    <RepositoryHeader {...props} />
    <div className={styles.reposetuppage}>
      <div className={styles.reposetuptext}>Repository Setup </div>
      <RenderCurrentPage {...props} />
    </div>
  </div>


RenderCurrentPage = (props) ->

  { koding, testFiles, hasToken } = props.repoSetup
  unless hasToken #or koding?.kodingerror
    return <KodingCredentials {...props} />
  if testFiles and Object.keys(testFiles).length > 0
    return <TestFilesSetup {...props} />
  if koding and Object.keys(koding).length > 0
    return <KodingSignInSuccess {...props} />
  if koding and Object.keys(koding).length is 0
    return <KodingCreateStackTemplate {...props} />



module.exports = RepositorySetup
