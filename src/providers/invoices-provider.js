let db = null
let invoice = null

// using single owner from now
const owner = 'Greg Milligan'

module.exports = (DB) => {
  db = DB.db
  invoice = db.collection('invoice')

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

        invoice.insertOne(data).then((result) => {
          // {"n":1,"ok":1}
          resolve(result)
        }).catch((err) => {
          reject(err)
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
    }
  }
}
