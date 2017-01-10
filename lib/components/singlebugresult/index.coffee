React = require 'react'
styles = require './styles.styl'
Tags = require 'components/tags'

module.exports = class SingleBugResult extends React.Component

  render: ->
    <div className={styles.singlebugresult}>
      <div className={styles.title}> Bug title goes here </div>
      <div className={styles.description}> Bug description goes here </div>
      <Tags />
    </div>