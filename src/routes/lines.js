/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let lines = null

// return all lines
router.get('/', (req, res, next) => {
  lines.getAll({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

// return all brief lines
router.get('/brief', (req, res, next) => {
  lines.getAllBrief({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

router.get('/active', (req, res, next) => {
  lines.getAllActive({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

// return line by id
router.get('/:id', (req, res, next) => {
  lines.get({ id: req.params.id }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// create new line - return
router.post('/', (req, res, next) => {
  lines.create({ owner: req.owner, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// update existing line - void return
router.put('/:id', (req, res, next) => {
  lines.update({ owner: req.owner, id: req.params.id, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  lines.delete({ id: req.params.id }).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  lines = require('../providers/lines-provider')(DB)
  return router
}
