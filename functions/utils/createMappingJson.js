var fs = require('fs');
var path = require('path');

var prepareTestEnvironment = require('./preparetestenvironment');
var storage = require('../storage');


module.exports = function(full_name, commitId) {

  var filename = full_name + "/" + commitId + "/" + "mapping.json";
  filename = filename.replace(/\//g, "_");
  var outputfile = "/tmp/" + filename ;
  return prepareTestEnvironment(full_name, commitId, function(mapping) {
    return fs.writeFile(outputfile, JSON.stringify(mapping, null, 2), function() {
      storage.upload(outputfile, (err, file) => {
        if(err){
          return console.log('COULDN\T CREATE MAPPING JSON FOR ', full_name, ' and commit id ', commitId);
        }
      });
    });
  });
};

