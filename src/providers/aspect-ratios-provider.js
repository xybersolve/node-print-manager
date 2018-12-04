let db = null
let aspectRatios = null
let ObjectId = null

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  aspectRatios = db.collection('aspectRatios')

  return {
    getAll: ({ owner }) => {
      return new Promise((resolve, reject) => {
        aspectRatios.find({ owner }).sort({ name: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getAllBrief: ({ owner }) => {
      return new Promise((resolve, reject) => {
        aspectRatios.find({ owner, active: true },
                       { name: 1, email: 1, commision: 1 })
                  .sort({ name: 1 })
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
        aspectRatios.find({ owner, active: true }).sort({ name: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    get: ({ id }) => {
      return new Promise((resolve, reject) => {
        aspectRatios.findOne({ _id: ObjectId(id) }).then(result => {
          console.dir(result)
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    create: ({ owner, data }) => {
      data.owner = owner
      return new Promise((resolve, reject) => {
        aspectRatios.insertOne(data).then((result) => {
          // {"n":1,"ok":1}
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    setDefault: ({ owner, id }) => {
      return new Promise((resolve, reject) => {
        // set all owners defaults to false
        // set selected entity default to true
        aspectRatios.updateMany({owner: owner},{$set: {default: false}}).then(result => {
          aspectRatios.updateOne({_id: ObjectId(id)}, {$set: {default: true}}).then(result => {
            resolve(result)
          }).catch((err => {
            reject(err)
          }))
        }).catch(err => {
          reject(err)
        })
      })
    },
    update: ({ id, data }) => {
      delete data._id
      return new Promise((resolve, reject) => {
        aspectRatios.bulkWrite([
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
        aspectRatios.deleteOne(
          { id: ObjectId(id) },
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
