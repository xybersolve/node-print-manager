/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let images = null

// return all images
router.get('/', (req, res, next) => {
  images.getAll({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

// return image by id
router.get('/:id', (req, res, next) => {
  images.get({ id: req.params.id }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// create new image - return image
router.post('/', (req, res, next) => {
  images.create({ owner: req.owner, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// update exisiting image - void return
router.put('/:id', (req, res, next) => {
  images.update({ owner: req.owner, id: req.params.id, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  images.delete({ id: req.params.id }).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  images = require('../providers/images-provider')(DB)
  return router
}
