/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let aspectRatios = null

// return all aspectRatios
router.get('/', (req, res, next) => {
  aspectRatios.getAll({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

// return all brief aspectRatios
router.get('/brief', (req, res, next) => {
  aspectRatios.getAllBrief({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

router.get('/active', (req, res, next) => {
  aspectRatios.getAllActive({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

// return location by id
router.get('/:id', (req, res, next) => {
  // console.log(`route:id: ${req.params.id}`)
  aspectRatios.get({ id: req.params.id }).then(location => {
    console.dir(location)
    res.status(200).json(location)
  }).catch(next)
})

// create new location - return
router.post('/', (req, res, next) => {
  aspectRatios.create({ owner: req.owner, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// set default entity for owner
router.put('/default/:id', (req, res, next) => {
  aspectRatios.setDefault({ owner: req.owner, id: req.params.id }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// update existing aspect ratio
router.put('/:id', (req, res, next) => {
  aspectRatios.update({ owner: req.owner, id: req.params.id, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  aspectRatios.delete({ id: req.params.id }).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  aspectRatios = require('../providers/aspect-ratios-provider')(DB)
  return router
}
