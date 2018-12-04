let db = null
let images = null
let ObjectId = null

module.exports = (DB) => {
  db = DB.db
  ObjectId = DB.ObjectId
  materials = db.collection('materials')

  return {
    getAll: ({ owner }) => {
      return new Promise((resolve, reject) => {
        materials.find({ owner }).sort({ material: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    setDefault: ({ owner, id }) => {
      return new Promise((resolve, reject) => {
        // set all owners defaults to false
        // set selected entity default to true
        materials.updateMany({owner: owner},{$set: {default: false}}).then(result => {
          materials.updateOne({_id: ObjectId(id)}, {$set: {default: true}}).then(result => {
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
        materials.bulkWrite([
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

  }
}
