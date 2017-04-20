React = require 'react'
styles = require './styles.styl'

UserHeader = require 'containers/header'
Landing = require 'containers/landing'

Loading = require 'components/loading'

{ auth } = require 'firebasedb'

App = (props) ->

  <div className={styles.container}>
    {
      if auth.currentUser
        <div>
          <UserHeader />
          { <Loading /> unless props.orgUser?}
          {props.children}
        </div>
      else
        <Landing />
    }
  </div>


module.exports = App

