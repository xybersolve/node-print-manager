/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let materials = null
let owner = 'Greg Milligan'

// return all materials
router.get('/', (req, res, next) => {
  materials.getAll().then(results => {
    res.send(results)
  }).catch(next)
})


module.exports = (DB) => {
  materials = require('../providers/materials-provider')(DB)
  return router
}
