React = require 'react'
ReactTooltip = require 'react-tooltip'

styles = require './styles.styl'

module.exports = Tooltip = (props) ->

  render: ->

    { className, children } = props

    <div className={styles.tooltipwrapper}>
      <div className={styles.tooltip} data-tip data-for='publishRepo'></div>
      <ReactTooltip id='publishRepo' aria-haspopup='true' >
        <span>{children}</span>
      </ReactTooltip>
    </div>
