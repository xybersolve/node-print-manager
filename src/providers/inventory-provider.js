let db = null
let inventory = null
let ObjectId = null

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  inventory = db.collection('inventory')

  return {
    getAll: ({ owner }) => {
      return new Promise((resolve, reject) => {
        inventory.find({ owner }).sort({ size: 1, name: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    get: ({ id }) => {
      console.log(`provider:id: ${id}`)
      return new Promise((resolve, reject) => {
        inventory.findOne({ _id: ObjectId(id) }).then(result => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    create: ({ owner, data }) => {
      console.dir(data)
      data.owner = owner
      return new Promise((resolve, reject) => {
        inventory.insertOne(data).then((result) => {
          // {"n":1,"ok":1}
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    addTo: ({owner, items}) => {
      return new Promise((resolve, reject) => {
        inventory.insertMany(items).then((result) => {
          // {"n":1,"ok":1}
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    update: ({ owner, id, data }) => {
      delete data._id
      return new Promise((resolve, reject) => {
        inventory.bulkWrite([
          { updateOne:
            {
              "filter": { _id: ObjectId(id) },
              "update": data
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
      console.log(`provider:id: ${id}`)
      return new Promise((resolve, reject) => {
        inventory.deleteOne(
          { _id: ObjectId(id) },
          { w: 1 , j: true}).then(result => {
          // {"n":0,"ok":1}
          resolve(result.result)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
