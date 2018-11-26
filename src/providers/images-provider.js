let db = null
let ObjectId = null
let images = null

// using single owner from now
const owner = 'Greg Milligan'

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  images = db.collection('images')

  // suport routines
  // get next id in the image collection for this owner
  const getNextId = (cb) => {
    images.find({ owner: owner }, { _id: 0, id: 1 }).sort({ id: -1 }).limit(1).toArray((err, result) => {
      if (err) return cb(err)
      let nextId = +result[0].id + 1
      cb(null, nextId)
    })
  }

  return {
    getAll: () => {
      return new Promise((resolve, reject) => {
        images.find({ owner: owner }).sort({ name: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    get: (id) => {
      console.log(`provider:id: ${id}`)
      return new Promise((resolve, reject) => {
        images.findOne({ _id: ObjectId(id) }).then(image => {
          resolve(image)
        }).catch(err => {
          reject(err)
        })
      })
    },
    create: ({ data, owner }) => {
      console.dir(data)
      data.owner = owner // stubbed functionality
      delete data._id; // mongo will create its own ObjectId
      return new Promise((resolve, reject) => {
        getNextId((err, nextId) => {
          if (err) return reject(err)
          data.id = nextId
          images.insertOne(data, {w:1}).then((result) => {
            // {"n":1,"ok":1}
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
        })
      })
    },
    update: ({data, id, owner}) => {
      delete data._id
      return new Promise((resolve, reject) => {
        images.bulkWrite([
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
      console.log(`delete - id: ${id}, owner: ${owner}`)
      //images.remove( {"_id": ObjectId(id)});
      return new Promise((resolve, reject) => {
        images.deleteOne(
          { _id: ObjectId(id), owner: owner },
          { w: 0, j: true }).then(result => {
          // {"n":0,"ok":1}
          resolve(result.result)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // just a test stub
    getNextId: () => {
      return new Promise((resolve, reject) => {
        getNextId((err, nextId) => {
          if (err) return reject(err)
          resolve({ id: nextId })
        })
      })
    }
  }
}
