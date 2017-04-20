var path = require('path');
var fs = require('fs');
var storage = require('../storage');


// delete mapping json after use it.

module.exports = function(suiteName, selectedOrganization, selectedRepo, selectedCommitId, callback) {
  var dependency, mapping, mappingPath, originalReqs, outputFile, ref, steps, testCount;
  var filename = selectedOrganization + "/" + selectedRepo + "/" + selectedCommitId + "/" + "mapping.json";

  filename = filename.replace(/\//g, "_");

  var outputFilePath = path.join("/tmp", filename);

  storage.file(filename).download({
    destination: outputFilePath
  }, function(err){
    mapping = fs.readFileSync(outputFilePath, 'utf-8');
    mapping = JSON.parse(mapping);
    originalReqs = mapping[suiteName];
    ref = mapping[suiteName], testCount = ref.testCount, steps = ref.steps;
    while (originalReqs.embedded) {
      dependency = originalReqs.embedded.name;
      originalReqs = mapping[dependency];
      steps = originalReqs.steps.concat(steps);
      testCount += originalReqs.testCount;
    }

    return callback(steps);
  })

};
