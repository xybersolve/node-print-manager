const { MongoClient, ObjectId } = require('mongodb')
const { connectString, database } = require('../config/config').mongo

let dbClient = null
let db = null

const connect = (dispatch) => {
  // console.log(`connectString: ${connectString}`)
  MongoClient.connect(connectString, { useNewUrlParser: true }, (err, DBClient) => {
    if (err) {
      dispatch.emit('database.error', err)
    }
    dbClient = DBClient
    db = dbClient.db(database)
    const DB = {
      db,
      ObjectId
    }
    dispatch.emit('database.ready', DB)
  })
}

const disconnect = () => {
  dbClient.close()
  dbClient = undefined
}

const postConnect = (DB) => {
  // routines to run after initial connection
  console.log('🍄  mongo.postConnect()')
  const col = DB.db.collection('images')
  col.distinct('name').then(names => console.log(`🚀  images->names.length: ${names.length}`))
}

const collection = name => db.collection(name)

module.exports = {
  connect,
  disconnect,
  postConnect,
  collection,
  db: dbClient
}
