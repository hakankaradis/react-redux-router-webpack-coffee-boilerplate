React = require 'react'
styles = require './styles.styl'


LandingFooter = (props) ->

  <div className={styles.landingfooter}>
    <img src={'/assets/footerlogo.svg'} className={styles.logo} />
    <div className={styles.buttonwrapper}>
      <div className={styles.button} onClick={-> console.log 'x'}>Support</div>
      <div className={styles.button} onClick={-> console.log 'x'}>Documentation</div>
      <div className={styles.button} onClick={-> console.log 'x'}>Sign In</div>
      <div className={styles.button} onClick={-> console.log 'x'}>Sign Up</div>
      <div className={styles.button} onClick={-> console.log 'x'}>Contact Us</div>
    </div>
  </div>


module.exports = LandingFooter
