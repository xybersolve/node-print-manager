/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let images = null

// return all images
router.get('/', (req, res, next) => {
  images.getAll().then(results => {
    res.send(results)
  }).catch(next)
})

// return image by id
router.get('/:id', (req, res, next) => {
  images.getImage(req.params.id).then((image) => {
    res.send(image)
  }).catch(next)
})

module.exports = (DB) => {
  images = require('../providers/images-provider')(DB)
  return router
}
