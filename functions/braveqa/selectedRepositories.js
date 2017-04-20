var cors = require('cors')({origin: true});
var functions = require('firebase-functions');
var ref = require('../firebase');
var database = ref.database;
var fetchSelectedRepositories = ref.fetchSelectedRepositories;
var fetchUserInfo = ref.fetchUserInfo;


module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {

    var orgName, ref, uid;
    ref = req.body, uid = ref.uid, orgName = ref.orgName;
    return fetchUserInfo(uid).then(function(userInfo) {
      var accessToken, githubLogin;
      accessToken = userInfo.accessToken, githubLogin = userInfo.githubLogin;
      if (!accessToken) {
        return res.send('Authentication Failed');
      }
      return fetchSelectedRepositories(uid, orgName).then(function(repos) {
        return res.send(repos);
      })["catch"](function(err) {
        return res.status(500).send(err);
      });
    });

  })
});

