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
        lines.find({ owner }, { name: 1, owner: 1, description: 1, active: 1, default: 1 })
          .sort({ name: 1 })
          .toArray().then(results => {
            resolve(results)
          }).catch(err => {
            reject(err)
          })
      })
    },
    getAllBrief: ({ owner }) => {
      return new Promise((resolve, reject) => {
        lines.find({ owner: owner }, { projection: { name: 1, active: 1, default: 1, _id: 0 } })
          .sort({ name: 1 })
          .toArray()
          .then(results => {
            resolve(results)
          }).catch(err => {
            reject(err)
          })
      })
    },
    getActiveBrief: ({ owner }) => {
      return new Promise((resolve, reject) => {
        lines.find({ owner: owner, active: true },
          { projection: { name: 1, default: 1, active: 1, _id: 0 } })
          .sort({ name: 1 })
          .toArray().then(results => {
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
        lines.insertOne(data).then(result => {
          // {"n":1,"ok":1}
          resolve(result)
        }).catch(err => {
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
    setDefault: ({ owner, id }) => {
      return new Promise((resolve, reject) => {
        // set all owners defaults to false
        // set selected entity default to true
        lines.updateMany({ owner: owner }, { $set: { default: false } }).then(result => {
          lines.updateOne({ _id: ObjectId(id) }, { $set: { default: true } }).then(result => {
            resolve(result)
          }).catch(err => {
            reject(err)
          })
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
