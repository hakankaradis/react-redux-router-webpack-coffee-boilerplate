var Promise = require('bluebird');
var request = require('request');

module.exports = function(kodingToken, groupName, data, operation) {

  return new Promise(function(resolve, reject) {
    var headers, options;
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    options = {
      url: "https://" + groupName + ".koding.com/remote.api/" + kodingToken + "/" + operation,
      method: 'POST',
      headers: headers,
      body: data ? data : void 0,
      json: true
    };
    return request(options, function(err, response, body) {
      if (err) {
        return reject(err);
      }
      if (body != null ? body.error : void 0) {
        return reject(body.error);
      }
      return resolve(body.data);
    });
  });
};
