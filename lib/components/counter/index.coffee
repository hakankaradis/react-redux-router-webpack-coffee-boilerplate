React = require 'react'
{ Link } = require 'react-router'

Counter = (props) ->

  <div>
    <button onClick={props.increment}> Increment </button>
    <button onClick={props.decrement}> Decrement </button>
    <div>
      <label> Result: </label>
      {props.counter}
    </div>
    <Link to='page1'> Page1 </Link>
    <div></div>
    <Link to='page2'> Page2 </Link>
  </div>


module.exports = Counter
