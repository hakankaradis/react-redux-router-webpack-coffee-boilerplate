increment = () ->
  return {
    type: 'INC'
  }

decrement = () ->
  return {
    type: 'DEC'
  }


module.exports = {
  increment
  decrement
}
