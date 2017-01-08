reducer = (state = 0, action) ->
  switch action.type
    when 'INC' then state+1
    when 'DEC' then state-1
    else state


module.exports = reducer
