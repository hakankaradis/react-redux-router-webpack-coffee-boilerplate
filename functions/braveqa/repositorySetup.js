var cors = require('cors')({origin: true});
var functions = require('firebase-functions');
var ref = require('../utils/firebase');
var fetchUserInfo = ref.fetchUserInfo;
var fetchOrganizationInfo = ref.fetchOrganizationInfo;
var repoStatus = ref.repoStatus;
var updateRepoStatus = ref.updateRepoStatus;

module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {

    var orgName, ref2, repo, uid;
    ref2 = req.body, uid = ref2.uid, orgName = ref2.orgName, repo = ref2.repo;

    return fetchUserInfo(uid).then(function(userInfo) {
      var accessToken, githubLogin;
      accessToken = userInfo.accessToken, githubLogin = userInfo.githubLogin;
      if (!accessToken) {
        return res.send('Authentication Failed');
      }
      return fetchOrganizationInfo(uid, orgName).then(function(orgInfo) {
        var status;
        if (!(orgInfo != null ? orgInfo.kodingToken : void 0)) {
          status = {
            koding: {},
            hasToken: false
          };
          updateRepoStatus(uid, orgName, repo, status);
          return res.send(status);
        }
        return repoStatus(uid, orgName, repo).then(function(repoStatus) {
          if (repoStatus == null) {
            repoStatus = {};
            repoStatus.hasToken = true;
            repoStatus.koding = {};
          }
          return res.send(repoStatus);
        });
      });
    });

  })
})



