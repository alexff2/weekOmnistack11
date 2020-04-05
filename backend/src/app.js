const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const { errors } = require('celebrate')

const app = express()

app.use(cors())
  .use(express.json())
  .use(routes)
  .use(errors())

module.exports = app
