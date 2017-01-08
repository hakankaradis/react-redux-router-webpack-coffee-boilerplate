React = require 'react'
{ connect } = require 'react-redux'
{ increment, decrement } = require 'actions/counterActions'

Counter = require 'components/counter'

mapStateToProps = (state) ->
  return {
    counter: state.counter
  }

mapDispatchToProps = (dispatch) ->
  return {
    increment: -> dispatch increment()
    decrement: -> dispatch decrement()
  }

module.exports = connect(
  mapStateToProps
  mapDispatchToProps
)(Counter)
