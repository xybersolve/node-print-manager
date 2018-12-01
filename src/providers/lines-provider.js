let db = null
let lines = null
let ObjectId = null

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  lines = db.collection('lines')

  return {
    getAll: ({ owner }) => {
      return new Promise((resolve, reject) => {
        lines.find({ owner }).sort({ sortOrder: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getAllBrief: ({ owner }) => {
      return new Promise((resolve, reject) => {
        lines.find({ owner },
                   { name: 1 })
                  .sort({ sortOrder: 1 })
                  .toArray()
                  .then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getAllActive: ({ owner }) => {
      return new Promise((resolve, reject) => {
        lines.find({ owner, active: true }).sort({ sortOrder: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    get: ({ id }) => {
      return new Promise((resolve, reject) => {
        lines.findOne({ _id: ObjectId(id) }).then(result => {
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
        lines.insertOne(data).then((result) => {
          // {"n":1,"ok":1}
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
      })
    },
    update: ({ id, data }) => {
      delete data._id
      return new Promise((resolve, reject) => {
        lines.bulkWrite([
          { updateOne:
            {
              "filter": {_id: ObjectId(id)},
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
      // console.log(`provider:id: ${id}, owner: ${owner}`)
      return new Promise((resolve, reject) => {
        lines.deleteOne(
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
