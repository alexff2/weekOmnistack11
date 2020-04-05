const express = require('express')
const OngsControllers = require('./controllers/OngsControllers')
const { celebrate } = require('celebrate')

const incidentsControllers = require('./controllers/IncidentsControllers')
const ProfileControllers = require('./controllers/ProfileControllers')
const SessionControllers = require('./controllers/SessionControllers')

const Validation = require('./validations')

const routes = express.Router()

routes.post('/sessions', celebrate(Validation.login), SessionControllers.create)

routes.get('/ongs', OngsControllers.index)
routes.post('/ongs', celebrate(Validation.ong), OngsControllers.create)

routes.get('/incidents', celebrate(Validation.page), incidentsControllers.index)
routes.post('/incidents', celebrate(Validation.incidents), incidentsControllers.create)
routes.delete('/incidents/:id', celebrate(Validation.delIncid), incidentsControllers.delete)

routes.get('/profile', celebrate(Validation.profile), ProfileControllers.index)

module.exports = routes