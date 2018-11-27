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
  invoices.getAll().then(results => {
    res.status(200).json(results);
  }).catch(next)
})

// return invoice by id
router.get('/:id', (req, res, next) => {
  console.log(`route:id: ${req.params.id}`)
  invoices.get(req.params.id).then(invoice => {
    console.dir(invoice)
    res.status(200).json(invoice)
  }).catch(next)
})

// create new invoice - return
router.post('/', (req, res, next) => {
  var opts = {
    owner,
    data: req.body
  }
  invoices.create(opts).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  var opts = {
    owner,
    id: req.params.id
  }
  invoices.delete(opts).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  invoices = require('../providers/invoices-provider')(DB)
  return router
}
