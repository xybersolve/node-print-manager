/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let images = null
let owner = 'Greg Milligan'

// return all images
router.get('/', (req, res, next) => {
  images.getAll({ owner: owner }).then(results => {
    res.send(results)
  }).catch(next)
})

// return image by id
router.get('/:id', (req, res, next) => {
  console.log(`route:id: ${req.params.id}`)
  images.get(req.params.id).then(image => {
    console.dir(image)
    res.status(200).json(image)
  }).catch(next)
})

// create new image - return image
router.post('/', (req, res, next) => {
  var opts = {
    owner,
    data: req.body
  }
  images.create(opts).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// update exisiting image - void return
router.put('/:id', (req, res, next) => {
  const opts = {
    owner,
    id: req.params.id,
    data: req.body
  }
  images.update(opts).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  var opts = {
    owner,
    id: req.params.id
  }
  images.delete(opts).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  images = require('../providers/images-provider')(DB)
  return router
}
