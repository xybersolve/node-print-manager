let db = null
let images = null

// using single owner from now
const owner = 'Greg Milligan'

module.exports = (DB) => {
  db = DB.db
  sizes = db.collection('sizes')

  return {
    getAll: () => {
      return new Promise((resolve, reject) => {
        sizes.find({}).sort({ volume: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getAspectRatios: () => {
      return new Promise((resolve, reject) => {
        sizes.distinct('ratio').then(results => {
          resolve(results.map(ratio => { return {'ratio': ratio}}))
        }).catch((err) => {
          reject(err)
        })
      })
    },
    get: (id) => {
      console.log(`provider:id: ${id}`)
      return new Promise((resolve, reject) => {
        sizes.findOne({ id: +id }).then(image => {
          resolve(image)
        }).catch(err => {
          reject(err)
        })
      })
    },
    create: ({ data }) => {
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
    delete: ({ id, owner }) => {
      // console.log(`provider:id: ${id}, owner: ${owner}`)
      return new Promise((resolve, reject) => {
        sizes.deleteOne(
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
