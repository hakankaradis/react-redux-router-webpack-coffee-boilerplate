var Encoder, Promise, defaultVariables, extraPart, fetch, fs, kodingReqs, path, yamlToJson;
fs = require('fs');
path = require('path');
Encoder = require('htmlencode');
yamlToJson = require('./yamlutils').yamlToJson;
Promise = require('bluebird');
kodingReqs = require('./kodingreqs');
fetch = require('./firebase/helper').fetch;


defaultVariables = function(token, cloneUrl, name, defaultBranch) {
  return "variable:\n  githubToken:\n    default: -|\n      '" + token + "'\n  payload_repository_url:\n    default: |-\n      '" + cloneUrl + "'\n  payload_repository_name:\n    default: |-\n      '" + name + "'\n  payload_after:\n    default: |-\n      '" + defaultBranch + "'\n\n";
};

extraPart = "\n        # Unless you know what you are doing, please do not edit this part \n        # clone repostitory and checkout the latest commit\n \n        git clone ${var.payload_repository_url} \n        cd ${var.payload_repository_name} \n        git checkout ${var.payload_after}\n";

module.exports = function(uid, token, groupName, provider, organization, repoName) {
  return new Promise(function(resolve, reject) {
    path = "users/" + uid + "/organizations/" + organization + "/repositories/" + repoName;
    return fetch(path).then(function(repo) {
      var cloneUrl, defaultBranch, name;
      name = repo.name, cloneUrl = repo.cloneUrl, defaultBranch = repo.defaultBranch;
      return kodingReqs(token, groupName, {
        provider: provider
      }, 'JStackTemplate.samples').then(function(sample) {
        var config, convertedDoc, rawContent, template, title, yaml;
        yaml = sample.yaml;
        yaml = defaultVariables(token, cloneUrl, name, defaultBranch) + yaml;
        yaml += extraPart;
        convertedDoc = yamlToJson(Encoder.htmlDecode(yaml));
        template = convertedDoc.content;
        title = "BraveQA Stack for " + repoName;
        rawContent = yaml;
        config = {
          groupStack: false,
          requiredData: {
            user: [],
            group: []
          },
          requiredProvider: [provider]
        };
        return resolve([
          {
            rawContent: rawContent,
            template: template,
            title: title,
            credentials: [],
            config: config
          }
        ]);
      })["catch"](function(error) {
        console.log('error', error);
        return reject(error);
      });
    });
  });
};
