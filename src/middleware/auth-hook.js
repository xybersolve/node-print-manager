/*
  Will eventually house the token evaluator

*/
exports.set = (owner) => {
  return (req, res, next) => {
    req.owner = owner
    next()
  }
}
