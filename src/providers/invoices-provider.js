let db = null
let invoice = null
let inventory = null
let ObjectId = null

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  invoice = db.collection('invoices')
  inventory = db.collection('inventory')
  return {
    getAll: ({ owner }) => {
      return new Promise((resolve, reject) => {
        invoice.find({ owner }).sort({ name: 1 }).toArray().then((results) => {
          console.dir(results)
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    get: ({ id }) => {
      return new Promise((resolve, reject) => {
        invoice.findOne({ _id: ObjectId(id) }).then(image => {
          resolve(image)
        }).catch(err => {
          reject(err)
        })
      })
    },
    create: ({ data, owner }) => {
      data.owner = owner
      delete data._id
      console.dir(data)
      return new Promise((resolve, reject) => {
        invoice.insertOne(data).then(result => {
          // check result? {"n":1,"ok":1}
          // add invoiceId (created above) into each item objects
          const items = data.items.map(item => {invoiceId: result._id}, ...item)
          switch(data.action) {
            case 'Delivered':
              console.log('put items into inventory');
              inventory.insertMany(items).then(result => {
                resolve(data)
              }).catch(err => {
                reject(err)
              })
              break
            case 'Sold':
              console.log('take items out of inventory');
              resolve(data)
              break
            default:
              console.log(`Unhandled action: ${data.action}`)
              resolve(data)
            }
        }).catch((err) => {
          // insert invoice error
          reject(err)
        })
      })
    },
    update: ({ id, data }) => {
      delete data._id
      return new Promise((resolve, reject) => {
        invoice.bulkWrite([
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
    /*
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
    }, */
    delete: ({ id }) => {
      // console.log(`provider:id: ${id}, owner: ${owner}`)
      return new Promise((resolve, reject) => {
        invoice.deleteOne(
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
