var path = require('path');
var fs = require('fs');
var ref = require('./parserfmlfile');
var parseTestSteps = ref.parseTestSteps;
var parseFileHeader = ref.parseFileHeader;
var parseEmbeddedTestInfo = ref.parseEmbeddedTestInfo;


module.exports = function(fileNames, outputfile, callback) {
  var mapping;
  mapping = {};

  fileNames.forEach(function(fileName) {
    var body, embedded, header, id, startIndex, startUri, steps, tag, testCount;
    body = fs.readFileSync(path.join(outputfile, fileName + ".rfml"), 'utf-8');
    body = body.split('\n\n');
    fileName = fileName.split('.')[0];
    header = parseFileHeader(body[0].split('\n'));
    embedded = parseEmbeddedTestInfo(body[1].split('\n'));
    startIndex = 1;
    if (embedded) {
      startIndex = 2;
    }
    steps = parseTestSteps(body, startIndex);
    testCount = steps.length;
    id = header.id;
    startUri = header.startUri;
    tag = header.tag;
    return mapping[fileName] = {
      id: id,
      startUri: startUri,
      testCount: testCount,
      steps: steps,
      tag: tag,
      embedded: embedded != null ? embedded : void 0
    };
  });

  return callback(mapping);
};

