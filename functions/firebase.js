var functions = require('firebase-functions');
var admin = require('firebase-admin');


fb = admin.initializeApp(functions.config().firebase);

module.exports = {
  database: fb.database(),
  auth: fb.auth(),
  fb: fb
};