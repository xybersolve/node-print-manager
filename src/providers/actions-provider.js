let db = null
let actions = null
let ObjectId = null

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  actions = db.collection('actions')

  return {
    getAll: ({ owner }) => {
      return new Promise((resolve, reject) => {
        actions.find({ owner }).sort({ name: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getAllBrief: ({ owner }) => {
      return new Promise((resolve, reject) => {
        actions.find({ owner, active: true }, { name: 1, email: 1, commision: 1 })
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
        actions.find({ owner, active: true }).sort({ name: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    get: ({ id }) => {
      return new Promise((resolve, reject) => {
        actions.findOne({ _id: ObjectId(id) }).then(result => {
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
        actions.insertOne(data).then((result) => {
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
        actions.updateMany({ owner: owner }, { $set: { default: false } }).then(result => {
          actions.updateOne({ _id: ObjectId(id) }, { $set: { default: true } }).then(result => {
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
        actions.deleteOne(
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
