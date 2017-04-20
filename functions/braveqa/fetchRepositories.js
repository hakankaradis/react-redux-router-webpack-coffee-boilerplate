var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var Promise = require('bluebird');
var _ = require('lodash');
var ref = require('../utils/firebase')
var repoStatus = ref.repoStatus
var fetchUserInfo = ref.fetchUserInfo;

var fetchRepositories = require('../utils/github').fetchRepositories;

module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {

    var orgName, ref1, uid;
    ref1 = req.body, uid = ref1.uid, orgName = ref1.orgName;

    return fetchUserInfo(uid).then(function(userInfo) {
      var accessToken, githubLogin;
      accessToken = userInfo.accessToken, githubLogin = userInfo.githubLogin;
      if (!accessToken) {
        return res.send('Authentication Failed');
      }
      return fetchRepositories(orgName, accessToken).then(function(repos) {

        var fetchRepos;
        fetchRepos = repos.map(function(repo) {
          repo = _.pick(repo, ['name', 'private', 'description', 'defaultBranch', 'cloneUrl']);

          repo.name = repo.name.replace(/\./g, '_')
          repo.organization = orgName;

          return repoStatus(uid, orgName, repo.name).then(function(status) {

            repo.status = 'Not setup yet';
            if (status && typeof status === 'object') {
              repo.status = 'Ready'
              if(!status.hasToken){
                repo.status = 'Continue';
              }
            }
            return repo;
          });
        });
        return Promise.all(fetchRepos).then(function(repos) {

          return res.send(repos);
        });
      })["catch"](function(err) {

        return res.status(500).send("Couldn't fetch repositories");
      });
    })
  });
});
