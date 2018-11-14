/*
  dbHook middleware hooks mongoDb to express request object

*/
exports.setup = (DB) => {
  return (req, res, next) => {
    req.mongoDB = DB
    next()
  }
}
