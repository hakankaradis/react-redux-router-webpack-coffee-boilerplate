var Promise = require('bluebird');
var request = require('request');


module.exports = function(data) {

  return new Promise(function(resolve, reject) {
    var groupName, headers, j, loginURL, options;
    groupName = data.groupName;
    loginURL = "https://" + groupName + ".koding.com/Login";
    headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    options = {
      url: loginURL,
      method: 'POST',
      headers: headers,
      form: data
    };
    j = request.jar();
    request = request.defaults({
      jar: j
    });
    return request(options, function(error, response, body) {
      var client_id, cookies;
      if (error || (body != null ? body.error : void 0)) {
        return reject('Login is not successful');
      }
      cookies = j.getCookieString(loginURL);
      client_id = cookies.split(';')[1].split('=')[1];
      return resolve(client_id);
    });
  });
};
