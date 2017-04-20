{ applyMiddleware, createStore } = require 'redux'
RequestMiddleware = require './requestmiddleware'

logger = require 'redux-logger'
thunk = require('redux-thunk').default
promise = require('redux-promise-middleware').default

reducer = require 'redux/reducers'
middleware = applyMiddleware RequestMiddleware, promise(), logger(), thunk

module.exports = createStore reducer, middleware
