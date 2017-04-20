var cors = require('cors')({origin: true});
var functions = require('firebase-functions');


fetchAuthenticatedUser = require('../utils/github').fetchAuthenticatedUser
updateUserInfo = require('../utils/firebase').updateUserInfo

module.exports = functions.https.onRequest((req, res) => {
  cors(req, res, () => {

    var accessToken, credential, ref, user;

    ref = req.body, user = ref.user, credential = ref.credential;
    accessToken = credential.accessToken;



    return fetchAuthenticatedUser(accessToken).then(function(githubUser) {
      var githubLogin, userInfo;
      githubLogin = githubUser.login;
      userInfo = Object.assign({}, user, {
        accessToken: accessToken,
        githubLogin: githubLogin,
        authenticated: true
      });
      updateUserInfo(user.uid, userInfo);

      user = Object.assign(user, {
        authenticated: true
      });
      return res.send(user);
    })["catch"](function(error) {
      user = Object.assign(user, {
        authenticated: false
      });
      return res.send(user);
    });

  })

})


