var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var Promise = require('bluebird');
var async = require('async');

var ref = require('../utils/firebase');
var fetchBuilds = ref.fetchBuilds;
var fetchOrganizationsTable = ref.fetchOrganizationsTable;



module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {
    var queue;

    queue = [
      function(next) {
        var orgs;
        orgs = {};
        return fetchOrganizationsTable().then(function(organizations) {
          Object.keys(organizations).forEach(function(orgName) {
            var avatarUrl, ref1, repos, star;
            ref1 = organizations[orgName], star = ref1.star, avatarUrl = ref1.avatarUrl, repos = ref1.repos;
            Object.keys(repos).forEach(function(repoName) {
              return repos[repoName].buildCount = 0;
            });
            return orgs[orgName] = {
              star: star,
              avatarUrl: avatarUrl,
              repos: repos
            };
          });
          return next(null, orgs);
        });
      }, function(orgs, next) {
        var builds;
        builds = [];
        Object.keys(orgs).forEach(function(orgName) {
          var repos;
          repos = orgs[orgName].repos;
          return Object.keys(repos).forEach(function(repoName) {
            return builds.push({
              orgName: orgName,
              repoName: repoName
            });
          });
        });
        builds = builds.map(function(arg) {
          var orgName, repoName;
          orgName = arg.orgName, repoName = arg.repoName;
          return fetchBuilds(orgName, repoName).then(function(builds) {
            console.log('BUILDS', builds);
            var count = 0;
            if(builds != null) {
              count = Object.keys(builds).length;
            }
            return {
              orgName: orgName,
              repoName: repoName,
              count: count
            };
          });
        });
        return Promise.all(builds).then(function(result) {
          result.forEach(function(arg) {
            var count, orgName, repoName;
            orgName = arg.orgName, repoName = arg.repoName, count = arg.count;
            return orgs[orgName].repos[repoName].buildCount = count;
          });
          return next(null, orgs);
        });
      }
    ];
    return async.waterfall(queue, function(err, orgs) {
      return res.send(orgs);
    });
  })
});



