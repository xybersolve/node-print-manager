/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let inventory = null

// return all inventory
router.get('/', (req, res, next) => {
  inventory.getAll({ owner: req.owner }).then(results => {
    res.status(200).json(results)
  }).catch(next)
})

// return invoice by id
router.get('/:id', (req, res, next) => {
  // console.log(`route:id: ${req.params.id}`)
  inventory.get({ id: req.params.id }).then(invoice => {
    console.dir(invoice)
    res.status(200).json(invoice)
  }).catch(next)
})

// create new invoice - return
router.post('/', (req, res, next) => {
  inventory.create({ owner: req.owner, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// update exisitng inventory item
router.put('/:id', (req, res, next) => {
  inventory.update({ owner: req.owner, id: req.params.id, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  inventory.delete({ id: req.params.id }).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  inventory = require('../providers/inventory-provider')(DB)
  return router
}
