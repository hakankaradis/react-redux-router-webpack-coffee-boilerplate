{ combineReducers } = require 'redux'

counterReducer = require './counter'

module.exports = combineReducers({counter: counterReducer})
