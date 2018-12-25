let db = null
let users = null
let ObjectId = null
const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  users = db.collection('users')

  return {
    getAll: () => {
      return new Promise((resolve, reject) => {
        users.find().sort({ username: 1 }).toArray().then(results => {
          resolve(results)
        }).catch(err => {
          reject(err)
        })
      })
    },
    authenticate: ({ username, password }) => {
      return new Promise((resolve, reject) => {
        users.findOne({ username: username, password: password }).then(user => {
          const token = jwt.sign({ sub: user._id }, config.secret)
          resolve(user, token)
        }).catch(err => {
          reject(err)
        })
      })
    },
    get: ({ id }) => {
      return new Promise((resolve, reject) => {
        users.findOne({ _id: ObjectId(id) }).then(result => {
          console.dir(result)
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    create: ({ data }) => {
      return new Promise((resolve, reject) => {
        users.insertOne(data).then(result => {
          // {"n":1,"ok":1}
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    delete: ({ id }) => {
      return new Promise((resolve, reject) => {
        users.deleteOne(
          { id: ObjectId(id) },
          { w: 0, j: true }).then(result => {
          resolve(result.result)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
