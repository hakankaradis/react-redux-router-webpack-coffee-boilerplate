var functions = require('firebase-functions');

var cors = require('cors')({origin: true});

require('./firebase')


exports.authenticateUser = require('./braveqa/authenticateUser')
exports.authenticateUserWithCredentials = require('./braveqa/authenticateUserWithCredentials')

exports.fetchOrganizations = require('./braveqa/fetchOrganizations')
exports.fetchOrganizationOwners = require('./braveqa/fetchOrganizationOwners')

exports.fetchRepositories = require('./braveqa/fetchRepositories')
exports.activateRepositories = require('./braveqa/activateRepositories')
exports.selectedRepositories = require('./braveqa/selectedRepositories')
exports.repositorySetup = require('./braveqa/repositorySetup')
exports.signInKoding = require('./braveqa/signInKoding')
exports.checkStackStatus = require('./braveqa/checkStackStatus')
exports.addWebhook = require('./braveqa/addWebhook')
exports.createStackTemplate = require('./braveqa/createStackTemplate')

exports.organizations = require('./tester/organizations')
exports.builds = require('./tester/builds')
exports.prepareTestSteps = require('./tester/prepareTestSteps')
exports.fetchCurrentTestCase = require('./tester/fetchCurrentTestCase')
exports.successCurrentTestCase = require('./tester/successCurrentTestCase')
exports.failCurrentTestCase = require('./tester/failCurrentTestCase')


exports.payload = require('./payload')
