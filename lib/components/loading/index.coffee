React = require 'react'
styles = require './styles.styl'

Loading = (props) ->

  <div className={styles.loading}>
    <div className={styles.box}>
      <label> Fetching your information. Please wait... </label>
    </div>
  </div>

module.exports = Loading