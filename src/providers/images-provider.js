let db = null
let ObjectId = null
let images = null

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  images = db.collection('images')

  return {
    getAll: ({ owner }) => {
      return new Promise((resolve, reject) => {
        images.find({ owner })
          .sort({ name: 1 })
          .toArray()
          .then(results => {
            resolve(results)
          }).catch(err => {
            reject(err)
          })
      })
    },
    get: ({ id }) => {
      return new Promise((resolve, reject) => {
        images.findOne({ _id: ObjectId(id) }).then(result => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    create: ({ data, owner }) => {
      data.owner = owner // stubbed functionality
      delete data._id // mongo will create its own ObjectId
      return new Promise((resolve, reject) => {
        images.insertOne(data, { w: 1 }).then(result => {
          // {"n":1,"ok":1}
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    update: ({ data, id }) => {
      delete data._id
      return new Promise((resolve, reject) => {
        images.bulkWrite([
          { updateOne:
            {
              'filter': { _id: ObjectId(id) },
              'update': data
            }
          }
        ]).then(result => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    delete: ({ id }) => {
      return new Promise((resolve, reject) => {
        images.deleteOne(
          { _id: ObjectId(id) },
          { w: 0, j: true }).then(result => {
          // {"n":0,"ok":1}
          resolve(result.result)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
