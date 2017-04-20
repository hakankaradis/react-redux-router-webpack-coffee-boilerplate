var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var slice = [].slice;

var ref = require('../utils/firebase');
var failUserCurrentTestCase = ref.failUserCurrentTestCase;
var fetchBuilds = ref.fetchBuilds;
var fetchFromOrganizationTable = ref.fetchFromOrganizationTable;
var fetchBuild = ref.fetchBuild;

module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {

    var caseCount, commitId, currentTestCase, index, info, orgName, ref1, ref2, repoName, rest, testId, uid;
    ref1 = req.body, uid = ref1.uid, currentTestCase = ref1.currentTestCase, info = ref1.info;

    index = currentTestCase.index, caseCount = currentTestCase.caseCount, testId = currentTestCase.testId;

    failUserCurrentTestCase(uid, testId, index, info);
    ref2 = testId.split('&'), orgName = ref2[0], repoName = ref2[1], commitId = ref2[2], rest = 4 <= ref2.length ? slice.call(ref2, 3) : [];

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
        description: description,
        commitId: commitId
      };
      return fetchBuild(orgName, repoName, commitId).then(function(build) {
        var test_suites;
        test_suites = build.test_suites;
        return res.send({
          header: header,
          test_suites: test_suites
        });
      });
    });
  })
});
