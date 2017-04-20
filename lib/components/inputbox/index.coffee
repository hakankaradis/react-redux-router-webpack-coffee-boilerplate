React = require 'react'
styles = require './styles.styl'
{ PropTypes } = React

InputBox = (props) ->

  { type, placeholder, value, onChange, className } = props
  className += " #{styles.inputbox}"
  <input className={className} type={type} placeholder={placeholder} value={value} onChange={onChange} />


InputBox.defaultProps =
  className: 'inputbox'
  type: 'text'
  placeholder: 'Your input here'
  value: ''
  onChange: ->


InputBox.propTypes =
  className: PropTypes.string
  type: PropTypes.string
  placeholder: PropTypes.string
  value: PropTypes.string
  onChange: PropTypes.func


module.exports = InputBox
