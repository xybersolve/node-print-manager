let db = null
let images = null

// using single owner from now
const owner = 'Greg Milligan'

module.exports = (DB) => {
  db = DB.db
  materials = db.collection('materials')

  return {
    getAll: () => {
      return new Promise((resolve, reject) => {
        materials.find().sort({ material: 1 }).toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}
