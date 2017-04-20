var cors = require('cors')({origin: true});
var functions = require('firebase-functions');


var kodingReqs = require('../utils/kodingreqs');

var ref = require('../utils/firebase');
var repoStatus = ref.repoStatus;
var updateRepoStatus = ref.updateRepoStatus;
var fetchOrganizationInfo = ref.fetchOrganizationInfo;


module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {

    var orgName, ref1, repo, uid;
    ref1 = req.body, uid = ref1.uid, orgName = ref1.orgName, repo = ref1.repo;
    return fetchOrganizationInfo(uid, orgName).then(function(organizationInfo) {
      var groupName, kodingToken;
      kodingToken = organizationInfo.kodingToken, groupName = organizationInfo.groupName;
      return repoStatus(uid, orgName, repo).then(function(repoStatus) {
        var baseStackId, ref2, url;
        ref2 = repoStatus.koding.stack, url = ref2.url, baseStackId = ref2.id;
        return kodingReqs(kodingToken, groupName, {
          baseStackId: baseStackId
        }, 'JComputeStack.one').then(function(stack) {
          var machine;
          machine = stack.machines[0];
          return kodingReqs(kodingToken, groupName, {
            _id: machine._id
          }, 'JMachine.one').then(function(machine) {
            var state;
            state = machine.status.state;
            repoStatus.koding.stack.machineStatus = state;
            updateRepoStatus(uid, orgName, repo, repoStatus);
            return res.send(repoStatus);
          })["catch"](function(error) {
            repoStatus.koding.stack.machineStatus = 'Machine is not ready';
            updateRepoStatus(uid, orgName, repo, repoStatus);
            return res.send(repoStatus);
          });
        })["catch"](function(error) {
          repoStatus.koding.stack.machineStatus = 'Not Initialized';
          updateRepoStatus(uid, orgName, repo, repoStatus);
          return res.send(repoStatus);
        });
      });
    });
  })
})
