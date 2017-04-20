React = require 'react'
styles = require './styles.styl'

UserHeader = (props) ->

  <div className={styles.userheader}>
    <img className={styles.logo} src={'/assets/userheaderlogo.svg'} />
    <div className={styles.links}>
      <div className={styles.supportlink} > Support </div>
      <div className={styles.documentationlink} > Documentation </div>
      <div className={styles.signout} onClick={props.signOut}> Sign Out </div>
    </div>
  </div>

module.exports = UserHeader