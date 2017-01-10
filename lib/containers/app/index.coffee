React = require 'react'
styles = require './styles.styl'

Header = require 'components/header'
BugResultList = require 'components/bugresultlist'

module.exports = class App extends React.Component

  render: ->

    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.middlecontent}>
          <BugResultList />
        </div>
      </div>
    </div>
