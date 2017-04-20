React = require 'react'
styles = require './styles.styl'

LandingHeader = (props) ->

  { landingToggle, toggleLanding } = props
  testerToggleClassName = styles.tester
  organizationToggleClassName = styles.organization

  if landingToggle is 'tester'
    testerToggleClassName += " #{styles.selected}"
  else
    organizationToggleClassName += " #{styles.selected}"



  <div className={styles.landingheader}>
    <img className={styles.logo} src={'/assets/landingheaderlogo.svg'} />
    <div className={styles.togglewrapper}>
      <div className={testerToggleClassName} onClick={-> toggleLanding 'tester'}> for Tester </div>
      <div className={organizationToggleClassName} onClick={-> toggleLanding 'organization'}> for Organizations </div>
    </div>
    <div className={styles.links}>
      <div className={styles.supportlink} > Support </div>
      <div className={styles.documentationlink} > Documentation </div>
      <div className={styles.extensionlink} > Download Chrome Plugin </div>
    </div>
  </div>

module.exports = LandingHeader
