var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var ref = require('../utils/firebase');
var fetchBuilds = ref.fetchBuilds;
var fetchFromOrganizationTable = ref.fetchFromOrganizationTable;


module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {

    var orgName, ref1, repoName, result;
    ref1 = req.body, orgName = ref1.orgName, repoName = ref1.repoName;

    result = {};
    return fetchFromOrganizationTable(orgName).then(function(org) {
      var avatarUrl, description, header, repo, repos, star;
      star = org.star, avatarUrl = org.avatarUrl, repos = org.repos;
      repo = repos[repoName];
      description = repo.description;
      header = {
        orgName: orgName,
        star: star,
        avatarUrl: avatarUrl,
        repoName: repoName,
        description: description
      };
      return fetchBuilds(orgName, repoName).then(function(builds) {
        var availableBuilds;
        availableBuilds = {};

        Object.keys(builds).forEach(function(commitId) {
          var build;

          build = builds[commitId];
          return availableBuilds[commitId] = build.test_suites;
        });
        return res.send({
          header: header,
          availableBuilds: availableBuilds
        });
      });
    });

  })
});
