var fs = require('fs');
var download = require('download');
var prepareMappingJson = require('./preparemappingjson');
var database = require('../firebase').database;


/*
  First download the rfml files
  Secondly prepare filenames
  Thirdly download all rfml files content to prepare mapping json

  Create utils folder to do those steps
 */

module.exports = function(repo, commitId, callback) {
  var outputFile, rfmlFilesURL;
  rfmlFilesURL = "https://raw.githubusercontent.com/" + repo + "/" + commitId + "/braveqa/.rfmls";

  outputFile = "/tmp/" + repo + "/" + commitId;
  return download(rfmlFilesURL, outputFile).then(function() {
    var data, file, filenames, testFiles;
    testFiles = [];
    fs.readFileSync(outputFile + "/rfmls").toString().split('\n').forEach(function(line) {
      if (line) {
        testFiles.push("https://raw.githubusercontent.com/koding/koding/master/" + line);
      }
    });

    filenames = testFiles.map(function(line) {
      return line.split('/').pop().split('.')[0];
    });

    file = fs.createWriteStream(outputFile + "/filenames");
    filenames.forEach(function(filename) {
      if(filename) {
        return file.write(filename + '\n');
      }
    });

    data = {
      test_suites: filenames,
      commit_id: commitId,
      project_id: repo.replace('/', '-')
    };

    database.ref("builds/" + repo + "/" + commitId).update(data);
    return Promise.all(testFiles.map(function(testFile) {
      return download("" + testFile, outputFile);
    })).then(function() {
      return prepareMappingJson(filenames, outputFile, callback);
    });
  });
};
