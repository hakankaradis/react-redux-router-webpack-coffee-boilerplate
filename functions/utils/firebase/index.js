var FirebaseUtils, fetch, push, ref, remove, set, update;

ref = require('./helper'), fetch = ref.fetch, update = ref.update, set = ref.set, remove = ref.remove, push = ref.push;

module.exports = FirebaseUtils = {
  fetchUserInfo: function(uid) {
    var path;
    path = "users/" + uid + "/info";
    return fetch(path);
  },
  updateUserInfo: function(uid, userInfo) {
    return update("users/" + uid + "/info", userInfo);
  },
  updateRepo: function(uid, repo) {
    var name, organization, path;
    organization = repo.organization, name = repo.name;
    path = "users/" + uid + "/organizations/" + organization + "/repositories/" + name;
    return update(path, repo);
  },
  repoStatus: function(uid, organization, repo) {
    var path;
    path = "users/" + uid + "/organizations/" + organization + "/repositories/" + repo + "/status";
    return fetch(path);
  },
  updateRepoStatus: function(uid, organization, repo, data) {
    var path;
    path = "users/" + uid + "/organizations/" + organization + "/repositories/" + repo + "/status";
    return update(path, data);
  },
  fetchSelectedRepositories: function(uid, organization) {
    var path;
    path = "users/" + uid + "/organizations/" + organization + "/repositories";
    return fetch(path);
  },
  fetchKodingAccessToken: function(uid, organization) {
    var path;
    path = "users/" + uid + "/organizations/" + organization + "/info/kodingToken";
    return fetch(path);
  },
  updateOrganizationInfo: function(uid, organization, data) {
    var path;
    path = "users/" + uid + "/organizations/" + organization + "/info";
    return update(path, data);
  },
  fetchOrganizationInfo: function(uid, organization) {
    var path;
    path = "users/" + uid + "/organizations/" + organization + "/info";
    return fetch(path);
  },
  updateUserAdminOrganizations: function(uid, data) {
    var path;
    path = "users/" + uid + "/adminOrganizations";
    return update(path, data);
  },
  addNewOrganization: function(orgName, data) {
    var path;
    path = "organizations/" + orgName;
    return update(path, data);
  },
  fetchFromOrganizationTable: function(orgName) {
    var path;
    path = "organizations/" + orgName;
    return fetch(path);
  },
  fetchOrganizationsTable: function() {
    var path;
    path = 'organizations';
    return fetch(path);
  },
  fetchBuilds: function(orgName, repo) {
    var path;
    path = "builds/" + orgName + "/" + repo;
    return fetch(path);
  },
  fetchBuild: function(orgName, repo, commitId) {
    var path;
    path = "builds/" + orgName + "/" + repo + "/" + commitId;
    return fetch(path);
  },
  updateUserCurrentTest: function(uid, data) {
    var path;
    path = "users/" + uid + "/currentTest";
    return update(path, data);
  },
  updateRunningTests: function(uid, testId, startTime) {
    var path;
    path = "running_tests/" + testId + "/testers/" + uid;
    return update(path, {
      startTime: startTime
    });
  },
  fetchUserCurrentTest: function(uid) {
    var path;
    path = "users/" + uid + "/currentTest";
    return fetch(path);
  },
  successUserCurrentTestCase: function(uid, index, testId) {
    var path;
    index = parseInt(index);
    path = "users/" + uid + "/currentTest";
    update(path, {
      current_test_case_index: index + 1
    });
    FirebaseUtils.updateUserTestSuiteHistory(uid, testId, index, 'success');
    path = "users/" + uid + "/currentTest/steps/" + index;
    update(path, {
      status: 'success',
      endTime: Date()
    });
    return FirebaseUtils.fetchUserCurrentTest(uid);
  },
  failUserCurrentTestCase: function(uid, testId, index, info) {
    var path;
    FirebaseUtils.updateUserTestSuiteHistory(uid, testId, index, info != null ? info.link : void 0);
    path = "users/" + uid + "/currentTest";
    return remove(path);
  },
  updateUserTestSuiteHistory: function(uid, testId, index, status) {
    var path;
    if (status == null) {
      status = 'failed';
    }
    index = 1 + parseInt(index);

    path = "users/" + uid + "/history/" + testId;
    return push(path, {
      status: status,
      testcase: index
    });
  }
};

// ---
// generated by coffee-script 1.9.2