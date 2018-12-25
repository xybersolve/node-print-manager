/*
  Exchange level information
*/
const express = require('express')
const router = express.Router()
let users = null

// return all users
router.get('/', (req, res, next) => {
  users.getAll().then(results => {
    res.send(results)
  }).catch(next)
})

// return all brief users
router.post('/authenticate', (req, res, next) => {
  const { username, password } = req.body
  users.authenticate({ username, password }).then(user => {
    res.send(user)
  }).catch(next)
})

router.get('/active', (req, res, next) => {
  users.getAllActive({}).then(results => {
    res.send(results)
  }).catch(next)
})

// return users by id
router.get('/:id', (req, res, next) => {
  // console.log(`route:id: ${req.params.id}`)
  users.get({ id: req.params.id }).then(users => {
    console.dir(users)
    res.status(200).json(users)
  }).catch(next)
})

// create new users - return
router.post('/', (req, res, next) => {
  users.create({ data: req.body }).then(result => {
    res.status(200).json(result)
  }).catch(next)
})

router.delete('/:id', (req, res, next) => {
  users.delete({ id: req.params.id }).then(result => {
    // { n: 0, ok: 1 }
    console.log(`route - ok:${result.ok}, n:${result.n}`)
    res.status(200).json(result)
  }).catch(next)
})

module.exports = (DB) => {
  users = require('../providers/users-provider')(DB)
  return router
}
