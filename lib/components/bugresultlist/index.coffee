React = require 'react'
styles = require './styles.styl'

SingleBugResult = require 'components/singlebugresult'

module.exports = class BugResultList extends React.Component

  render: ->
    <div className={styles.bugresultlist}>
      <SingleBugResult />
      <SingleBugResult />
      <SingleBugResult />
      <SingleBugResult />
      <SingleBugResult />
      <SingleBugResult />
    </div>