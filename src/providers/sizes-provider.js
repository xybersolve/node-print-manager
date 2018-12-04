let db = null
let images = null
let ObjectId = null

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  sizes = db.collection('sizes')

  return {
    getAll: ({ owner }) => {
      return new Promise((resolve, reject) => {
        sizes.find({ owner: owner },
                   { projection:{ size: 1, ratio: 1, volume: 1, owner: 1, active: 1 } })
              .sort({ratio:1, volume: 1})
             .toArray().then(results => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getAspectRatios: () => {
      return new Promise((resolve, reject) => {
        sizes.distinct('ratio').then(results => {
          resolve(results.map(result => { return {'ratio': result}}))
        }).catch((err) => {
          reject(err)
        })
      })
    },
    get: ({ id }) => {
      return new Promise((resolve, reject) => {
        sizes.findOne({ _id: ObjectId(id) }).then(result => {
          resolve(result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    create: ({ owner, data }) => {
      data.owner = owner
      console.dir(data)
      return new Promise((resolve, reject) => {
        sizes.insertOne(data).then((result) => {
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
        sizes.updateMany({owner: owner},{$set: {default: false}}).then(result => {
          sizes.updateOne({_id: ObjectId(id)}, {$set: {default: true}}).then(result => {
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
      console.log('size.update()')
      console.dir(data)
      return new Promise((resolve, reject) => {
        sizes.bulkWrite([
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
        sizes.deleteOne(
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
