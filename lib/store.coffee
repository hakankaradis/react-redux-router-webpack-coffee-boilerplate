{ applyMiddleware, createStore } = require 'redux'

logger = require 'redux-logger'
thunk = require('redux-thunk').default
promise = require('redux-promise-middleware').default

reducer = require './reducers'
middleware = applyMiddleware promise(), logger(), thunk

module.exports = createStore reducer, middleware
