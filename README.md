# Brave QA Website
  brave.qa is website where organization owners come and automate their tests with real people.

### Steps
  - Select an organization
  - Select a repository
  - Integrate with Koding.com
  - Customize test environment stack
  - Add Webhook to repository to catch push commits
  - Create Test Stack

# Brave QA Chrome Extension

  ![](https://chrome.google.com/webstore/detail/qa-chrome-extension/aenfjbniniahgbocllaopbkhiflfkane/related?utm_source=gmail)
  Every push to setup repository creates a new test for repository.
  This extension provides easy test interface to test every test suites step by step.


# Brave QA Server

  Firebase cloud functions.

### Project Folders

  + braveqa: the requests from brave.qa
  + tester: the requests from chrome-extension
  + payload.js: triggered via github webhook

