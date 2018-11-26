let db = null
let invoice = null

// using single owner from now
const owner = 'Greg Milligan'

module.exports = (DB) => {
  db = DB.db
  invoice = db.collection('invoice')

  // suport routines
  // get next id in the image collection for this owner
  const getNextId = (cb) => {
    invoice.find({ owner: owner }, { _id: 0, id: 1 }).sort({ id: -1 }).limit(1).toArray((err, result) => {
      if (err) return cb(err)
      if (! result || result.length === 0) {
        return cb(null, 0)
      }
      let nextId = +result[0].id + 1
      return cb(null, nextId)
    })
  }

  return {
    getAll: () => {
      return new Promise((resolve, reject) => {
        invoice.find({ owner: owner }).sort({ name: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    get: (id) => {
      console.log(`provider:id: ${id}`)
      return new Promise((resolve, reject) => {
        invoice.findOne({ id: +id, owner: owner }).then(image => {
          resolve(image)
        }).catch(err => {
          reject(err)
        })
      })
    },
    create: ({ data, owner }) => {
      console.dir(data)
      data.owner = owner
      delete data._id;
      return new Promise((resolve, reject) => {
        getNextId((err, nextId) => {
          if (err) return reject(err)
          data.id = nextId
          // resolve(data)
          invoice.insertOne(data).then((result) => {
            // {"n":1,"ok":1}
            resolve(result)
          }).catch((err) => {
            reject(err)
          })
        })
      })
    },
    update: ({ data, owner }) => {
      data.owner = owner
      return new Promise((resolve, reject) => {
        invoice.update(data).then((result) => {
            // {"n":1,"ok":1}
          resolve(result)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    delete: ({ id, owner }) => {
      // console.log(`provider:id: ${id}, owner: ${owner}`)
      return new Promise((resolve, reject) => {
        invoice.deleteOne(
          { id: id, owner: owner },
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
