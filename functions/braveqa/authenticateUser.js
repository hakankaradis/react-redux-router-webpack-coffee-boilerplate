var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

fetchUserInfo = require('../utils/firebase').fetchUserInfo


module.exports = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    var user;
    user = req.body.user;
    if (!user.uid) {
      return res.status(500).send('uid is not provided');
    }
    return fetchUserInfo(user.uid).then(function(userInfo) {
      var accessToken, githubLogin;
      if (!userInfo) {
        user.authenticated = false;
        return res.send(user);
      }
      if (userInfo) {
        accessToken = userInfo.accessToken, githubLogin = userInfo.githubLogin;
        if (!accessToken) {
          user.authenticated = false;
          return res.send(user);
        }
        user.authenticated = true;
        return res.send(user);
      }
    })
  })

})