React = require 'react'
styles = require './styles.styl'

module.exports = class App extends React.Component

  render: ->

    <div className={styles.container}> {@props.children} </div>
