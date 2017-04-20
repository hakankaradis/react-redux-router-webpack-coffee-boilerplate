var getTemplateData = require('./getTemplateData');
var kodingReqs = require('./kodingreqs');
var updateRepoStatus = require('./firebase').updateRepoStatus;


module.exports = function(repoStatus, token, uid, organization, repo, callback) {
  var groupName, provider, ref;
  ref = repoStatus.koding, groupName = ref.groupName, provider = ref.provider;
  return getTemplateData(uid, token, groupName, provider, organization, repo).then(function(template) {
    return kodingReqs(token, groupName, template, 'JStackTemplate.create').then(function(stackTemplate) {
      var _id, stackUrl;
      _id = stackTemplate._id;
      stackUrl = "https://" + groupName + ".koding.com/Stack-Editor/" + _id;
      repoStatus.koding.stack.url = "https://" + groupName + ".koding.com/Stack-Editor/" + _id;
      repoStatus.koding.stack.id = _id;
      updateRepoStatus(uid, organization, repo, repoStatus);
      return callback(repoStatus);
    })["catch"](function(error) {
      repoStatus.koding.stack.error = error;
      updateRepoStatus(uid, organization, repo, repoStatus);
      return callback(repoStatus);
    });
  })["catch"](function(error) {
    repoStatus.koding.stack.error = error;
    updateRepoStatus(uid, organization, repo, repoStatus);
    return callback(repoStatus);
  });
};
