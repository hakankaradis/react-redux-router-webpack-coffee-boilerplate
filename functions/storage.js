var gcloud = require('google-cloud');
var serviceAccount = require('./serviceAccountKey.json');
var path = require('path');

var filename = path.join(__dirname, 'serviceAccountKey.json');

var storage = gcloud.storage({
  projectId: 'braveqa-214f6',
  keyFilename: filename
});


module.exports = bucket = storage.bucket('braveqa-214f6.appspot.com')
