module.exports = RequestMiddleware = (store) -> (next) -> (action) ->

  { request, types, meta, keepInSession } = action
  return next action  unless request

  requestResult = request store.getState()

  return  unless requestResult

  setTimeout(
    ->
      next { type : types.START, meta }  if types.START

      # if request result is firebase db reference, add listener of value event
      if typeof requestResult.on is 'function'
        requestResult.off 'value'
        return requestResult.on 'value', (snapshot) ->
          data = snapshot.val()
          next { type : types.SUCCESS, data, meta, keepInSession }

      # otherwise, handle request result as promise
      requestResult
        .then (data) ->
          next { type : types.SUCCESS, data, meta, keepInSession }
        .catch (error) ->
          next { type : types.FAILURE, error, meta, keepInSession }
    0
  )

  return requestResult
