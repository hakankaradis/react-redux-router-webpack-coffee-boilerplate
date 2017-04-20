React = require 'react'
styles = require './styles.styl'

LandingFooter = require './landingfooter'
LandingHeader = require './landingheader'

Button = require 'components/button'

OrgContent =
  "Automate Your Tests": "Create your test files and upload to GitHub. BraveQA will detect all the changes on those files and sync the test on BraveQA."
  "New Push? No Hassle": "Whenever you have a push on GitHub, we automatically sync your repository and testers always see the latest builds and latest test suits."
  "Payment Simplified" : "You will see all the transactions and payment in one place. You can approove or reject all the completed or failed tests."
  "Failed Test? We Have Proof" : "When a tester report a fail on the test, we take a screenshot of that page so that you can eliminate if that is a fail or not. Not a rocket science."
  "Intuitive Dashboard" : "Our easy to use dashboard shows all waiting, in progress, completed or paused builds in one page. It makes easy to track the process."
  "Easy Repository Setup": "We made all the steps very clear to have you success in a short time while setting your repo up to create your test environments and publish them."


TesterContent =
  "Start to Test Suits Immediately": "When you download and signup for BraveQA, you can browse and start to test the suits immediately and start earning money."
  "Select Company or Tests": "With an ease, you choose which company or which repository or builds you want to work on. Easy to navigate and browse all of them."
  "Get Paid When You are Done" : "When you complete a test, we will transfer your money to your eccount from organization’s account. It might take a few day to be on your account."
  "Easy to Use Test Interface" : "You will not be distracted with something else. Just follow the steps. Everything is designed to make the tests convenient for you."
  "Manage Your Earnings" : "Track your earnings easily. We are 100% transparent on your earnings. You can see how moch you have earned from which organization all the time."
  "Invite Testers and Earn More": "We believer in word of mouth. When you invite your friends or colleagues to BraveQA, we will send you free credit for each."



Landing = (props) ->

  { landingToggle, toggleLanding, connectWithGithub } = props

  if landingToggle is 'tester'
    buttonTitle = 'Download Chrome Extension'
    bg = 'green'
    buttonOnClick = ->
      window.open('https://chrome.google.com/webstore/detail/qa-chrome-extension/aenfjbniniahgbocllaopbkhiflfkane/related?utm_source=gmail', '_blank')
  else
    buttonTitle='Sign In with Github'
    bg = 'pink'
    buttonOnClick = connectWithGithub
  <div className={styles.landingwelcome}>
    <LandingHeader landingToggle={landingToggle} toggleLanding={toggleLanding} />
    <Head landingToggle={landingToggle} connectWithGithub={connectWithGithub} />
    <Body landingToggle={landingToggle} />
    <Button className={styles.action} title={buttonTitle} onClick={buttonOnClick} bg={bg} />
    <LandingFooter />
  </div>


module.exports = Landing



Head = ({ landingToggle, connectWithGithub }) ->

  src = '/assets/organizationlanding.png'
  src = '/assets/userlanding.png'  if landingToggle is 'tester'

  <div className={styles.head}>
    <HeadContent landingToggle={landingToggle} connectWithGithub={connectWithGithub} />
    <img className={styles.headlanding} src={src} />
  </div>


Body = ({ landingToggle }) ->

  content = TesterContent
  content = OrgContent  if landingToggle is 'organization'

  <div className={styles.contents}>
    {
      Object.keys(content).map (title) ->
        data = content[title]
        <SingleContent key={title} title={title} data={data} />
    }
  </div>


SingleContent = ({ title, data }) ->

  <div className={styles.singlecontent}>
    <div className={styles.title}> {title} </div>
    <div className={styles.data}> {data} </div>
  </div>



HeadContent = ({ landingToggle, connectWithGithub }) ->

  if landingToggle is 'tester'
    title = 'Test and get paid easily! '
    description = 'Complete a QA test with an easy to use Chrome extension on your browser and get paid!'
    buttonTitle = 'Download Chrome Extension'
    bg = 'green'
    buttonOnClick = ->
      window.open('https://chrome.google.com/webstore/detail/qa-chrome-extension/aenfjbniniahgbocllaopbkhiflfkane/related?utm_source=gmail', '_blank')
    secText = 'Are you an organization?'
  else
    title = 'Test environment made easy'
    description = 'Sync your GitHub repositories with BraveQA, publish your tests and done! Manage all your test in one place. '
    buttonTitle='Sign In with Github'
    bg = 'pink'
    buttonOnClick = connectWithGithub
    secText = 'Already a member? Sign In'

  <div className={styles.headcontent}>
    <div className={styles.title}>{title}</div>
    <div className={styles.description}>{description}</div>
    <Button className={styles.action} title={buttonTitle} onClick={buttonOnClick} bg={bg} />
    <div className={styles.secAction}>{secText}</div>
  </div>

