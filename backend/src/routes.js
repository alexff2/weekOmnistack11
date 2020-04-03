const express = require('express')
const OngsControllers = require('./controllers/OngsControllers')
const incidentsControllers = require('./controllers/IncidentsControllers')
const ProfileControllers = require('./controllers/ProfileControllers')
const SessionControllers = require('./controllers/SessionControllers')

const routes = express.Router()

routes.post('/sessions', SessionControllers.create)

routes.get('/ongs', OngsControllers.index)
routes.post('/ongs', OngsControllers.create)

routes.get('/incidents', incidentsControllers.index)
routes.post('/incidents', incidentsControllers.create)
routes.delete('/incidents/:id', incidentsControllers.delete)

routes.get('/profile', ProfileControllers.index)

module.exports = routes