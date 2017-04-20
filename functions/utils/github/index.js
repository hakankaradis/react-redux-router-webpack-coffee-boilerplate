var Octokat = require('octokat');
var async = require('async');
var Promise = require('bluebird');
var GITHUB_API_URL = 'https://api.github.com';
var request = require('request');

var web_hook = {
  name: "web",
  active: true,
  events: ["push"],
  config: {
    url: "https://us-central1-braveqa-214f6.cloudfunctions.net/payload",
    content_type: "json"
  }
};


module.exports = GithubService = {

  fetchAuthenticatedUser: function(token) {
    var apiUrl, octo;
    if (!token) {
      return Promise.reject('Access token');
    }
    octo = new Octokat({
      token: token
    });
    apiUrl = GITHUB_API_URL + "/user";
    return octo.fromUrl(apiUrl).fetch();
  },
  fetchOrganizations: function(token, githubLogin) {
    var apiUrl, octo;
    if (!token) {
      return Promise.reject('Access token');
    }
    octo = new Octokat({
      token: token
    });
    apiUrl = GITHUB_API_URL + "/users/" + githubLogin + "/orgs";
    return octo.fromUrl(apiUrl).fetch();
  },
  fetchOrganizationOwners: function(organization, token) {
    var apiUrl, octo;
    octo = new Octokat({
      token: token
    });
    apiUrl = GITHUB_API_URL + "/orgs/" + organization + "/members?role=admin";
    return octo.fromUrl(apiUrl).fetch();
  },
  fetchMyRoleInOrganization: function(organization, arg) {
    var accessToken, apiUrl, githubLogin, octo;
    githubLogin = arg.githubLogin, accessToken = arg.accessToken;
    octo = new Octokat({
      token: accessToken
    });
    apiUrl = GITHUB_API_URL + "/orgs/" + organization + "/memberships/" + githubLogin;
    return octo.fromUrl(apiUrl).fetch();
  },
  fetchRepositories: function(organization, token) {
    var octo;
    octo = new Octokat({
      token: token
    });
    apiUrl = GITHUB_API_URL + "/orgs/" + organization + "/repos?type=public"
    return octo.fromUrl(apiUrl).fetchAll();
  },
  addWebhook: function(token, owner, repo, callback) {
    var octo;
    octo = new Octokat({
      token: token
    });
    return octo.repos(owner, repo).fetch(function(err, repo) {
      return repo.hooks.create(web_hook).then(function(info) {
        return callback(null, info);
      })["catch"](function(err) {
        console.log('errrrr', err);
        return callback(err);
      });
    });
  },
  fetchSingleOrganization: function(token, organization) {
    var apiUrl, octo;
    octo = new Octokat({
      token: token
    });
    apiUrl = GITHUB_API_URL + "/orgs/" + organization;
    return octo.fromUrl(apiUrl).fetch();
  }
};

