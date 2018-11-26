/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let status = null
let owner = 'Greg Milligan'

// return all status
router.get('/', (req, res, next) => {
  status.getAll().then(results => {
    res.send(results)
  }).catch(next)
})

// return all brief status
router.get('/brief', (req, res, next) => {
  status.getAllBrief().then(results => {
    res.send(results)
  }).catch(next)
})

router.get('/active', (req, res, next) => {
  status.getAllActive().then(results => {
    res.send(results)
  }).catch(next)
})


// test - get next id
router.get('/next-id', (req, res, next) => {
  status.getNextId().then(result => {
    console.dir(result)
    res.send(result)
  }).catch(next)
})

// return image by id
router.get('/:id', (req, res, next) => {
  console.log(`route:id: ${req.params.id}`)
  status.get(req.params.id).then(image => {
    console.dir(image)
    res.status(200).json(image)
  }).catch(next)
})

// create new image - return
router.post('/', (req, res, next) => {
  var opts = {
    owner,
    data: req.body
  }
  status.create(opts).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  var opts = {
    owner,
    id: req.params.id
  }
  status.delete(opts).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  status = require('../providers/status-provider')(DB)
  return router
}
