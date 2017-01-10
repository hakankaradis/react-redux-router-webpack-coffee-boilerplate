React = require 'react'
styles = require './styles.styl'
Seachbox = require 'containers/searchbox'

module.exports = class Header extends React.Component

  render: ->
    <div className={styles.header}>
      <div className={styles.contentwrapper}>
        <div className={styles.logo}> BB </div>
        <Seachbox />
        <div className={styles.buttonswrapper}>
          <div className={styles.loginbutton}> Login</div>
          <div className={styles.signupbutton}> Sign up </div>
        </div>
      </div>
    </div>