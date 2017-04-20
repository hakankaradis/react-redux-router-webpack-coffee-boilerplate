var cors = require('cors')({origin: true});
var functions = require('firebase-functions');


var kodingReqs = require('./utils/kodingreqs');
var fetchFromOrganizationTable = require('./utils/firebase').fetchFromOrganizationTable;
var checkstackeverymin = require('./utils/checkstackeverymin');


module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {
    var body, branch, commitId, full_name, html_url, orgName, payload, ref, ref1, repoName;

    payload = req.body;

    // payload = body.payload;
    branch = payload.ref, commitId = payload.after, (ref = payload.repository, (ref1 = ref.owner, orgName = ref1.name), repoName = ref.name, full_name = ref.full_name, html_url = ref.html_url);

    return fetchFromOrganizationTable(orgName).then(function(info) {
      var groupName, id, kodingToken, ref2, repos, url;

      groupName = info.groupName, kodingToken = info.kodingToken, repos = info.repos;
      ref2 = repos[repoName], url = ref2.url, id = ref2.stackId;

      return kodingReqs(kodingToken, groupName, payload, "JStackTemplate.build/" + id).then(function(stack) {
        var eventId, stackId;

        eventId = stack.eventId;
        stackId = eventId.split('-')[1];

        checkstackeverymin(kodingToken, groupName, commitId, full_name, stackId);
        return res.send(stackId);
      })["catch"](function(error) {
        return console.log('error ', error);
      });
    });

  })
});

