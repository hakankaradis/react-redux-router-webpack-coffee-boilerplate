var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var ref = require('../utils/firebase');
var updateRepo = ref.updateRepo;
var repoStatus = ref.repoStatus;
var fetchUserInfo = ref.fetchUserInfo;
var fetchOrganizationInfo = ref.fetchOrganizationInfo;


module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {

    var ref, repo, uid;
    ref = req.body, uid = ref.uid, repo = ref.repo;
    var orgName = repo.organization

    return fetchUserInfo(uid).then(function(userInfo) {
      var accessToken, githubLogin;
      accessToken = userInfo.accessToken, githubLogin = userInfo.githubLogin;
      if (!accessToken) {
        return res.send('Authentication Failed');
      }

      // save repo and return status once status'u sey yap
      return fetchOrganizationInfo(uid, orgName).then(function(orgInfo) {
       var status;
        if (!(orgInfo != null ? orgInfo.kodingToken : void 0)) {
          status = {
            koding: {},
            hasToken: false
          };

          repo.status = status;
          updateRepo(uid, repo)
          return res.send(status);
        }
        return repoStatus(uid, orgName, repo.name).then(function(repoStatus) {

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
});





