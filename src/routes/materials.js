/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let materials = null

// return all materials
router.get('/', (req, res, next) => {
  materials.getAll({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

// set default entity for owner
router.put('/default/:id', (req, res, next) => {
  materials.setDefault({ owner: req.owner, id: req.params.id }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// update existing material
router.put('/:id', (req, res, next) => {
  materials.update({ owner: req.owner, id: req.params.id, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  materials = require('../providers/materials-provider')(DB)
  return router
}
