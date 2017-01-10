React = require 'react'
{ connect } = require 'react-redux'

Searchbox = require 'components/searchbox'

mapStateToProps = (state) ->
  return {
    query: 'search query'
  }

module.exports = connect(
  mapStateToProps
)(Searchbox)
