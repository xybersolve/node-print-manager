const env = process.env
const nodeEnv = env.NODE_ENV || 'development'

const HOST = env.HOST || '0.0.0.0'
const PORT = env.PORT || 7070
// const serverUrl = `http://${this.host}:${this.port}`
const apiVersion = 'v1'
const restBase = `/api/${apiVersion}`
const secret = 'lkhaepoiloirgnsvlksergcaerf'
const mongo = {
  username: 'myname',
  password: 'password',
  database: 'printManager',
  // "host"    : "localhost",
  host: env.MONGO_HOST || 'localhost',
  port: '27017',
  get connectString () {
    return `mongodb://${this.host}:${this.port}`
    // return `mongodb://${this.host}:${this.port}/${this.database}`
    // return `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`
  }
}

module.exports = {
  nodeEnv,
  apiVersion,
  secret,
  restBase,
  mongo,
  PORT,
  HOST,
  // serverUrl,
  get serverUrl () {
    return `http://${this.host}:${this.port}`
  }
}
