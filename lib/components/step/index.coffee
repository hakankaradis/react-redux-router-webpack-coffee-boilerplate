React = require 'react'
styles = require './styles.styl'


Step = ({ number }) ->

  <div className={styles.step}>STEP {number}</div>


module.exports = Step
