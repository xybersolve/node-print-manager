let db = null
let images = null

module.exports = (DB) => {
  db = DB.db
  images = db.collection('images')

  return {
    getAll: () => {
      return new Promise((resolve, reject) => {
        images.find().toArray().then((results) => {
          resolve(results)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    getImage: (id) => {
      console.log(`image id: ${id}`)
      return new Promise((resolve, reject) => {
        images.find({ id }).toArray().then((image) => {
          resolve(image)
        }).catch((err) => {
          reject(err)
        })
      })
    }
  }
}
