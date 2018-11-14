// public modules
const express = require('express')
const server = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const { EventEmitter } = require('events')
const dispatch = new EventEmitter()

// environment
// require('dotenv').config({path: './config/variables.env'})
// if (process.env.NODE_ENV !== 'production')  require('dotenv').load()

// internal modules
const checkVersion = require('./support/version-check')
const { PORT, restBase } = require('./config/config')
const mongo = require('./database/mongo')

// middleware
const dbHookSetup = require('./middleware/db-hook').setup
const errorHandlers = require('./middleware/errorHandlers')
// const reflect = require('./middleware/reflect')

checkVersion()

const routeSetup = (DB) => {
  // embed db in router request
  const dbHook = dbHookSetup(DB)
  server.use(bodyParser.urlencoded({
    extended: true
  }))
  server.use(bodyParser.json())
  server.use(cors())
  // server.use(dbHook)
  // /api/v1/heatseeker
  console.log(`👉🏻  restBase: ${restBase}`)
  server.use(`${restBase}/images`, dbHook, require('./routes/images')(DB))
  // server.use(`${restBase}/heatseeker`, dbHook, require('./routes/heatseeker'))
  // server.use(`${restBase}/exchange`, dbHook, require('./routes/exchange'))
  // server.use(`${restBase}/coin`, dbHook, require('./routes/coin'))
  // server.use(`${restBase}/options`, dbHook, require('./routes/options'))
}

const errorSetup = () => {
  server.use(errorHandlers.notFound)
  if (server.get('env') === 'development') {
    server.use(errorHandlers.developmentErrors)
  }
  server.use(errorHandlers.productionErrors)
}

// middleware - reflects request infomation
server.use((req, res, next) => {
  console.log(`👉🏻  ${req.method}: ${req.protocol}:/${req.url}`)
  next()
})

// obvious feedback where we are currently running
console.log(`${server.get('env') === 'development' ? '🖖🏻  DEVELOPMENT' : '🙏🏻  PRODUCTION'} environment`)

// mongo.connect().then((DB, DBClient) => {
dispatch.on('database.ready', (DB) => {
  console.log(`🍒  event: database.ready`)
  mongo.postConnect(DB)

  routeSetup(DB)
  errorSetup()

  // open for buisness
  server.listen(PORT, () => {
    console.log(`👌🏻  Server Listening on Port: ${PORT}`)
  })
})

dispatch.on('database.error', (err) => {
  console.error('⛔️ Unable to get MongoDb connection')
  console.error(err)
})

mongo.connect(dispatch)

module.exports = server
