React = require 'react'
styles = require './styles.styl'
{ PropTypes } = React

classNames = require 'classnames'

Button = (props) ->

  { title, onClick, bg, size, type } = props

  className = classNames [
    styles.button
    styles[bg]
    styles[size]
    styles[type]
    props.className
  ]

  <div className={className} onClick={onClick}>
    <div className={styles.text}>{title}</div>
  </div>

module.exports = Button

