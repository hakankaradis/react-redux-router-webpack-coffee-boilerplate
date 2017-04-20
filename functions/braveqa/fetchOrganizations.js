var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var async = require('async');
// // var ref = require('../utils/firebase');
// //
var fetchUserInfo = require('../utils/firebase').fetchUserInfo;
var updateUserAdminOrganizations = require('../utils/firebase').updateUserAdminOrganizations;

// // var ref1 = require('../utils/github');

var fetchMyRoleInOrganization = require('../utils/github').fetchMyRoleInOrganization;
var fetchOrganizations = require('../utils/github').fetchOrganizations;
// ​

module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {


    var uid;
    uid = req.body.uid;

    if (!uid) {
      return res.status(500).send('uid is not provided');
    }

    return fetchUserInfo(uid).then(function(userInfo) {

      var accessToken, githubLogin, queue;
      if (!userInfo) {
        return res.send('Authentication Failed');
      }
      accessToken = userInfo.accessToken, githubLogin = userInfo.githubLogin;
      if (!accessToken) {
        return res.send('Authentication Failed');
      }
      queue = [
        function(next) {
          return fetchOrganizations(accessToken, githubLogin)
            .then(function(orgs) {

              var organizations;
              organizations = orgs.items;
              orgs = {};
              organizations.forEach(function(org) {
                var avatarUrl, login;
                login = org.login, avatarUrl = org.avatarUrl;
                return orgs[login] = {
                  avatarUrl: avatarUrl,
                  role: ''
                };
              });
              return next(null, orgs);
            })
            .catch(function(err){
              console.log('fetch orgs error ', err);
            })
        }, function(orgs, next) {
          var myRoles;
          myRoles = Object.keys(orgs).map(function(orgName) {
            return fetchMyRoleInOrganization(orgName, {
              accessToken: accessToken,
              githubLogin: githubLogin
            });
          });
          return Promise.all(myRoles).then(function(roles) {
            roles.forEach(function(role) {
              var login, ref2, ref3;
              ref2 = role, role = ref2.role, (ref3 = ref2.organization, login = ref3.login);
              return orgs[login].role = role;
            });
            return next(null, orgs);
          });
        }
      ];
      return async.waterfall(queue, function(err, orgs) {

        var userAdminOrganizations;
        userAdminOrganizations = [];
        Object.keys(orgs).map(function(orgName) {
          var org, role;
          org = orgs[orgName];
          role = org.role;
          if (role === 'admin') {
            return userAdminOrganizations.push(orgName);
          }
        });
        updateUserAdminOrganizations(uid, userAdminOrganizations);
        return res.send(orgs);
      });
    })
  })

})


