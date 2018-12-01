/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let invoices = null

/*
200 — OK, The request was successful
201 — CREATED, A new resource object was successfully created
404 — NOT FOUND, The requested resource could not be found
400 —BAD REQUEST, The request was malformed or invalid
500 — INTERNAL SERVER ERROR, Unknown server error has occurred
*/

// return all invoices
router.get('/', (req, res, next) => {
  invoices.getAll({ owner: req.owner }).then(results => {
    res.status(200).json(results);
  }).catch(next)
})

// return invoice by id
router.get('/:id', (req, res, next) => {
  // console.log(`route:id: ${req.params.id}`)
  invoices.get({ id: req.params.id }).then(invoice => {
    console.dir(invoice)
    res.status(200).json(invoice)
  }).catch(next)
})

// create new invoice - return
router.post('/', (req, res, next) => {
  invoices.create({ owner: req.owner, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  invoices.delete({ id: req.params.id }).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  invoices = require('../providers/invoices-provider')(DB)
  return router
}
