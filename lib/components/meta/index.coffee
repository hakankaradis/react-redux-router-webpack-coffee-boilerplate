React = require 'react'
styles = require './styles.styl'

Meta = (props) ->

  { title, description } = props

  <div className={styles.meta}>
    <div className={styles.title}>{title}</div>
    <div className={styles.description}>{description}</div>
  </div>

module.exports = Meta
