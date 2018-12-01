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
    }
  }
}
