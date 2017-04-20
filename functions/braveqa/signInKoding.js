var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var request = require('request');
var kodingLogin = require('../utils/kodinglogin');
var kodingReqs = require('../utils/kodingreqs');

var ref = require('../utils/firebase');

var updateRepoStatus = ref.updateRepoStatus;
var updateOrganizationInfo = ref.updateOrganizationInfo;

var createStackTemplate = require('../utils/createStackTemplate');


module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {
    var groupName, headers, organization, password, provider, ref1, repo, uid, username;
    ref1 = req.body, uid = ref1.uid, groupName = ref1.groupName, username = ref1.username, password = ref1.password, provider = ref1.provider, organization = ref1.organization, repo = ref1.repo;
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    return kodingLogin({
      groupName: groupName,
      username: username,
      password: password
    }).then(function(client_id) {
      return kodingReqs(client_id, groupName, null, 'JApiToken.create').then(function(arg) {
        var code, repoStatus;
        code = arg.code;
        updateOrganizationInfo(uid, organization, {
          kodingToken: code,
          groupName: groupName
        });
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
        return createStackTemplate(repoStatus, code, uid, organization, repo, function(repoStatus) {
          return res.send(repoStatus);
        });
      })["catch"](function(error) {
        var repoStatus;
        repoStatus = {
          koding: {
            kodingerror: 'Apitoken not created'
          }
        };
        updateRepoStatus(uid, organization, repo, repoStatus);
        return res.send(repoStatus);
      });
    })["catch"](function(error) {
      var repoStatus;
      repoStatus = {
        koding: {
          kodingerror: 'Apitoken not created'
        }
      };
      updateRepoStatus(uid, organization, repo, repoStatus);
      return res.send(repoStatus);
    });
  })
});

