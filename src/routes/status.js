/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let status = null

// return all status
router.get('/', (req, res, next) => {
  status.getAll({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

// return all brief status
router.get('/brief', (req, res, next) => {
  status.getAllBrief({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

router.get('/active', (req, res, next) => {
  status.getAllActive({ owner: req.owner }).then(results => {
    res.send(results)
  }).catch(next)
})

// return status by id
router.get('/:id', (req, res, next) => {
  status.get({ id: req.params.id }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

// create new status - return
router.post('/', (req, res, next) => {
  status.create({ owner: req.owner, data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  status.delete({ id: req.params.id }).then(result => {
    // { n: 0, ok: 1 }
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  status = require('../providers/status-provider')(DB)
  return router
}
