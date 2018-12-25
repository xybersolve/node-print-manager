const expressJwt = require('express-jwt')
const config = require('../config/config')

const jwt = () => {
  const { secret } = config
  return expressJwt({ secret }).unless({
    path: [
      '/users/authenticate'
    ]
  })
}

module.exports = jwt
