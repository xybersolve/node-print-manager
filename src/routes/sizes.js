/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let sizes = null

// return all sizes
router.get('/', (req, res, next) => {
  sizes.getAll({ owner: req.owner }).then(results => {
    res.status(200).json(results)
  }).catch(next)
})

// apectRatios
router.get('/aspect-ratios', (req, res, next) => {
  sizes.getAspectRatios({ owner: req.owner }).then(result => {
    console.dir(result)
    res.status(200).json(result)
  }).catch(next)
})

// return size by id
router.get('/:id', (req, res, next) => {
  console.log(`route:id: ${req.params.id}`)
  sizes.get({ id: req.params.id }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// create new size - return
router.post('/', (req, res, next) => {
  sizes.create({ owner: req.owner, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// set default entity for owner
router.put('/default/:id', (req, res, next) => {
  console.log('put default')
  sizes.setDefault({ owner: req.owner, id: req.params.id }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// update existing aspect ratio
router.put('/:id', (req, res, next) => {
  sizes.update({ owner: req.owner, id: req.params.id, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  sizes.delete({ id: req.params.id }).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  sizes = require('../providers/sizes-provider')(DB)
  return router
}
