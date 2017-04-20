var FirebaseHelper, Promise, database;

Promise = require('bluebird');

database = require('../../firebase').database;

module.exports = FirebaseHelper = {
  fetch: function(path) {
    if (!path) {
      return Promise.reject('Path is not provided');
    }
    return new Promise(function(resolve, reject) {
      return database.ref(path).once('value').then(function(snapshot) {
        return resolve(snapshot.val());
      })["catch"](function(error) {
        return reject(error);
      });
    });
  },
  update: function(path, values) {
    if (!path) {
      return Promise.reject('User id is not provided');
    }
    if (!values) {
      return Promise.reject('Update values are not provided');
    }
    return database.ref(path).update(values);
  },
  set: function(path, values) {
    if (!path) {
      return Promise.reject('User id is not provided');
    }
    if (!values) {
      return Promise.reject('Set values are not provided');
    }
    return database.ref(path).set(values);
  },
  remove: function(path) {
    return database.ref(path).remove();
  },
  push: function(path, data) {
    var dataKey;
    dataKey = database.ref(path).push().key;
    return database.ref(path + "/" + dataKey).set(data);
  }
};
