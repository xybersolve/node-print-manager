/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let images = null
let owner = 'Greg Milligan'

// return all images
router.get('/', (req, res, next) => {
  images.getAll().then(results => {
    res.send(results)
  }).catch(next)
})

// test - get next id
router.get('/next-id', (req, res, next) => {
  images.getNextId().then(result => {
    console.dir(result)
    res.send(result)
  }).catch(next)
})

// return image by id
router.get('/:id', (req, res, next) => {
  console.log(`route:id: ${req.params.id}`)
  images.getImage(req.params.id).then(image => {
    console.dir(image)
    res.send(image)
  }).catch(next)
})

// create new image - return
router.post('/', (req, res, next) => {
  var opts = {
    owner,
    data: req.body
  }
  images.createImage(opts).then(result => {
    res.json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  var opts = {
    owner,
    id: req.params.id
  }
  images.deleteImage(opts).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.json(result)
  }).catch(next)
})

module.exports = (DB) => {
  images = require('../providers/images-provider')(DB)
  return router
};
