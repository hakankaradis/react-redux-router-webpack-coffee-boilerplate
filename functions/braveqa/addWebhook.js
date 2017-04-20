var cors = require('cors')({origin: true});
var functions = require('firebase-functions');


var ref = require('../utils/github');
var addWebhook = ref.addWebhook;
var fetchSingleOrganization = ref.fetchSingleOrganization;

var ref1 = require('../utils/firebase');
var addNewOrganization = ref1.addNewOrganization;
var fetchUserInfo = ref1.fetchUserInfo;
var repoStatus = ref1.repoStatus;
var updateRepoStatus = ref1.updateRepoStatus;
var fetchOrganizationInfo = ref1.fetchOrganizationInfo;


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
      return addWebhook(accessToken, orgName, repo, function(err, info) {
        return repoStatus(uid, orgName, repo).then(function(repoStatus) {
          var id, pingUrl, ref3, testUrl, url;
          repoStatus.webhook = false;
          if (!err) {
            testUrl = info.testUrl, pingUrl = info.pingUrl, id = info.id;
            repoStatus.webhook = {
              testUrl: testUrl,
              pingUrl: pingUrl,
              id: id
            };
          }
          updateRepoStatus(uid, orgName, repo, repoStatus);
          ref3 = repoStatus.koding.stack, url = ref3.url, id = ref3.id;
          fetchOrganizationInfo(uid, orgName).then(function(orgInfo) {
            var groupName, kodingToken;
            groupName = orgInfo.groupName, kodingToken = orgInfo.kodingToken;
            return fetchSingleOrganization(accessToken, orgName).then(function(organization) {
              var avatarUrl, data, followers, following, login, obj;
              login = organization.login, avatarUrl = organization.avatarUrl, followers = organization.followers, following = organization.following;
              data = {
                star: 0,
                login: login,
                groupName: groupName,
                followers: followers,
                following: following,
                avatarUrl: avatarUrl,
                kodingToken: kodingToken,
                repos: (
                  obj = {},
                  obj["" + repo] = {
                    url: url,
                    stackId: id
                  },
                  obj
                )
              };
              return addNewOrganization(orgName, data);
            })["catch"](function(error) {
              return console.log('error couldnt fetch organization', error);
            });
          });
          return res.send(repoStatus);
        });
      });
    });
  })
});


