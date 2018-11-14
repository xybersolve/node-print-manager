/******************************************
  async await error handling wrapper for rest calls
*/
exports.catchErrors = fn => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next)
  }
}

/******************************************
  Not found error handler
*/
exports.notFound = () => {
  return (req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  }
}

/******************************************
  MongoDB Validation Error Handler
   - show via flash messages
*/
// exports.flashValidationErrors = (err, req, res, next) => {
//   if(!err.errors) return next(err)
//   const errorKeys = Object.keys(err.errors)
//   errorKeys.forEach(key => req.flash('error', errors[key].message))
//   res.redirect('back')
// }

/******************************************
  Development Error Handler
   * development allows us to whow verbose error messages
*/
exports.developmentErrors = () => {
  return (err, req, res, next) => {
    err.stack = err.stack || 500
    const errorDetails = {
      message: err.message,
      status: err.status,
      stcackHilighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
    }
    res.status(err.status || 500)
    // formatting based on accept headers
    res.format({
      'text/html': () => res.send('error', errorDetails),
      'application/json': () => res.json(errorDetails) // Ajax call
    })
  }
}

/******************************************
  Production Error Handler
   * No stacktraces leaked to end-user
*/
exports.productionErrors = () => {
  return (err, req, res, next) => {
    res.status(err.status || 500)
    res.send('error', {
      message: err.message,
      error: {}
    })
  }
}
