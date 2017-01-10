React = require 'react'
styles = require './styles.styl'

module.exports = class SearchBox extends React.Component

  render: ->
    <input className={styles.searchbox} value={@props.query} />
