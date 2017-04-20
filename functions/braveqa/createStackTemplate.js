var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var ref = require('../utils/firebase');
var fetchOrganizationInfo = ref.fetchOrganizationInfo;
var updateRepoStatus = ref.updateRepoStatus;
var createStackTemplate = require('../utils/createStackTemplate');

module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {

    var ref1 = req.body;
    var uid = ref1.uid;
    var organization = ref1.organization
    var repo = ref1.repo
    var provider = ref1.provider

    fetchOrganizationInfo(uid, organization).then(function(orgInfo){
      var groupName = orgInfo.groupName;
      var kodingToken = orgInfo.kodingToken;

      repoStatus = {
        hasToken: true,
        koding: {
          provider: provider,
          groupName: groupName,
          stack: {
            url: '',
            error: '',
            id: ''
          }
        }
      };
      updateRepoStatus(uid, organization, repo, repoStatus);
      return createStackTemplate(repoStatus, kodingToken, uid, organization, repo, function(repoStatus) {
        return res.send(repoStatus);
      });
    });
  })
})