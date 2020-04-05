const { Segments, Joi } = require('celebrate')

module.exports = {
  login: {
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  },
  ong: {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2)
    })
  },
  page: {
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  },
  incidents: {
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(), 
      description: Joi.string().required(), 
      value: Joi.number().required(), 
      ongs_id: Joi.string().required()
    })
  },
  delIncid: {
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  },
  profile: {
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }
}