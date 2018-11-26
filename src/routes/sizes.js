/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let sizes = null

/*
200 — OK, The request was successful
201 — CREATED, A new resource object was successfully created
404 — NOT FOUND, The requested resource could not be found
400 —BAD REQUEST, The request was malformed or invalid
500 — INTERNAL SERVER ERROR, Unknown server error has occurred
*/


// return all images
router.get('/', (req, res, next) => {
  sizes.getAll().then(results => {
    res.status(200).json(results);
  }).catch(next)
})

// apectRatios
router.get('/aspect-ratios', (req, res, next) => {
  sizes.getAspectRatios().then(result => {
    console.dir(result)
    res.status(200).json(result)
  }).catch(next)
})

// test - get next id
router.get('/next-id', (req, res, next) => {
  sizes.getNextId().then(result => {
    console.dir(result)
    res.status(200).json(result)
  }).catch(next)
})

// return image by id
router.get('/:id', (req, res, next) => {
  console.log(`route:id: ${req.params.id}`)
  sizes.get(req.params.id).then(image => {
    console.dir(image)
    res.status(200).json(image)
  }).catch(next)
})

// create new image - return
router.post('/', (req, res, next) => {
  var opts = {
    owner,
    data: req.body
  }
  sizes.create(opts).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  var opts = {
    owner,
    id: req.params.id
  }
  sizes.delete(opts).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  sizes = require('../providers/sizes-provider')(DB)
  return router
}
