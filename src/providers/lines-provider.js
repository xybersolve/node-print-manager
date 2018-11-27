let db = null
let lines = null
let ObjectId = null

// using single owner for now
const owner = 'Greg Milligan'

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  lines = db.collection('lines')

  return {
    getAll: () => {
      return new Promise((resolve, reject) => {
        lines.find({ owner: owner }).sort({ sortOrder: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getAllBrief: () => {
      return new Promise((resolve, reject) => {
        lines.find({ owner: owner },
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
    getAllActive: () => {
      return new Promise((resolve, reject) => {
        lines.find({ owner: owner, active: true }).sort({ sortOrder: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    get: (id) => {
      console.log(`provider:id: ${id}`)
      return new Promise((resolve, reject) => {
        lines.findOne({ _id: ObjectId(id), owner: owner }).then(result => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    create: ({ data, owner }) => {
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
    update: ({data, id, owner}) => {
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
    delete: ({ id, owner }) => {
      // console.log(`provider:id: ${id}, owner: ${owner}`)
      return new Promise((resolve, reject) => {
        lines.deleteOne(
          { id: id, owner: owner },
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
