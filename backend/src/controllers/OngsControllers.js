const crypto = require('crypto')
const connection = require('../database/connections')

module.exports = {
  index: async (req, res) => {
    const ongs = await connection('ongs').select('*')
    return res.send(ongs)
  },
  create: async (req, res) => {
    const {name, email, whatsapp, city, uf} = req.body
  
    const id = crypto.randomBytes(4).toString('HEX')
  
    await connection('ongs').insert({
      id, name, email, whatsapp, city, uf
    })
  
    return res.json({ id })
  }
}