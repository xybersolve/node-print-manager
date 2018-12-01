/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let locations = null

// return all locations
router.get('/', (req, res, next) => {
  locations.getAll({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

// return all brief locations
router.get('/brief', (req, res, next) => {
  locations.getAllBrief({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

router.get('/active', (req, res, next) => {
  locations.getAllActive({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

// return location by id
router.get('/:id', (req, res, next) => {
  // console.log(`route:id: ${req.params.id}`)
  locations.get({ id: req.params.id }).then(location => {
    console.dir(location)
    res.status(200).json(location)
  }).catch(next)
})

// create new location - return
router.post('/', (req, res, next) => {
  locations.create({ owner: req.owner, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  locations.delete({ id: req.params.id }).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  locations = require('../providers/locations-provider')(DB)
  return router
}
