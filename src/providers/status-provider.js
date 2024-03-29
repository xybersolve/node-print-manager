let db = null
let status = null
let ObjectId = null

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  status = db.collection('status')

  return {
    getAll: ({ owner }) => {
      return new Promise((resolve, reject) => {
        status.find({ owner }).sort({ status: 1 }).toArray().then(results => {
          resolve(results)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllBrief: ({ owner }) => {
      return new Promise((resolve, reject) => {
        status.find({ owner, active: true }, { status: 1 })
          .sort({ status: 1 }).toArray().then(results => {
            resolve(results)
          }).catch(err => {
            reject(err)
          })
      })
    },
    getAllActive: ({ owner }) => {
      return new Promise((resolve, reject) => {
        status.find({ owner, active: true }).sort({ name: 1 }).toArray().then(results => {
          resolve(results)
        }).catch(err => {
          reject(err)
        })
      })
    },
    get: ({ id }) => {
      return new Promise((resolve, reject) => {
        status.findOne({ _id: ObjectId(id) }).then(image => {
          resolve(image)
        }).catch(err => {
          reject(err)
        })
      })
    },
    create: ({ owner, data }) => {
      data.owner = owner
      return new Promise((resolve, reject) => {
        status.insertOne(data).then(result => {
          // {"n":1,"ok":1}
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    delete: ({ id }) => {
      return new Promise((resolve, reject) => {
        status.deleteOne(
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
