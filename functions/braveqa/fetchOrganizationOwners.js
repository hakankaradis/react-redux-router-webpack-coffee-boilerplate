var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var _, fetchOrganizationOwners, fetchUserInfo;

fetchUserInfo = require('../utils/firebase').fetchUserInfo;

fetchOrganizationOwners = require('../utils/github').fetchOrganizationOwners;

_ = require('lodash');

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
      return fetchOrganizationOwners(orgName, accessToken).then(function(arg) {
        var items;
        items = arg.items;
        return res.send(items.map(function(item) {
          return _.pick(item, ['login', 'avatarUrl']);
        }));
      })["catch"](function(err) {
        return res.status(500).send(err);
      });
    });

  })
})

