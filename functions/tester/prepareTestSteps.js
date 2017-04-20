var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var prepareTestSteps = require('../utils/prepareteststeps');

var ref = require('../utils/firebase');
var updateUserCurrentTest = ref.updateUserCurrentTest;
var updateRunningTests = ref.updateRunningTests;



module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {

    var data, index, ref1, selectedCommitId, selectedOrganization, selectedRepo, startTime, steps, suiteName, testId, uid;
    ref1 = req.body, uid = ref1.uid, suiteName = ref1.suiteName, selectedOrganization = ref1.selectedOrganization, selectedRepo = ref1.selectedRepo, selectedCommitId = ref1.selectedCommitId;

    prepareTestSteps(suiteName, selectedOrganization, selectedRepo, selectedCommitId, function(steps){

      index = 0;
      steps.map(function(step) {
        step.status = 'not_started';
        step.suggestion = '';
        step.wrong_description = '';
        step.index = index;
        return index += 1;
      });
      startTime = Date();
      steps[0].startTime = startTime;
      steps[0].status = 'started';
      testId = selectedOrganization + "&" + selectedRepo + "&" + selectedCommitId + "&" + suiteName;
      data = {
        steps: steps,
        testId: testId,
        test_count: steps.length,
        current_test_case_index: 0,
        startTime: startTime
      };
      updateUserCurrentTest(uid, data);
      updateRunningTests(uid, testId, startTime);
      index = 0;
      return res.send({
        index: index,
        step: steps[index],
        caseCount: steps.length,
        testId: testId
      });
    });

  })
})




