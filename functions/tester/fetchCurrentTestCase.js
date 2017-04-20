var cors = require('cors')({origin: true});
var functions = require('firebase-functions');

var fetchUserCurrentTest = require('../utils/firebase').fetchUserCurrentTest;

module.exports = functions.https.onRequest((req, res) => {

  cors(req, res, () => {
    var uid;
    uid = req.body.uid;

    return fetchUserCurrentTest(uid).then(function(currentTest) {
      var caseCount, index, steps, testId;
      if (!currentTest || currentTest === null) {
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
