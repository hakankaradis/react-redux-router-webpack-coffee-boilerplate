FirebaseCredentials = require './firebasecredentials'
firebase = require 'firebase/app'
require 'firebase/auth'
require 'firebase/database'
require 'firebase/storage'

fb = firebase.initializeApp FirebaseCredentials

module.exports = {
  fb: fb
  database: fb.database()
  auth: fb.auth()
  storage: fb.storage()
}