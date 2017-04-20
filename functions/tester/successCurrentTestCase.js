var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var successUserCurrentTestCase = require('../utils/firebase').successUserCurrentTestCase;

module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {

    var caseCount, currentTestCase, index, ref, testId, uid;
    ref = req.body, uid = ref.uid, currentTestCase = ref.currentTestCase;
    index = currentTestCase.index, caseCount = currentTestCase.caseCount, testId = currentTestCase.testId;
    return successUserCurrentTestCase(uid, index, testId).then(function(currentTest) {
      var steps;
      if (!currentTest) {
        res.send(null);
      }
      index = currentTest.current_test_case_index, steps = currentTest.steps, caseCount = currentTest.test_count, testId = currentTest.testId;
      return res.send({
        index: index,
        step: steps[index],
        caseCount: caseCount,
        testId: testId
      });
    });
  })
});
