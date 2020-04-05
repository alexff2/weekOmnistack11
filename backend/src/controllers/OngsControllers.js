const connection = require('../database/connections')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
  index: async (req, res) => {
    const ongs = await connection('ongs').select('*')
    return res.send(ongs)
  },
  create: async (req, res) => {
    const {name, email, whatsapp, city, uf} = req.body
  
    const id = generateUniqueId()
  
    await connection('ongs').insert({
      id, name, email, whatsapp, city, uf
    })
  
    return res.json({ id })
  }
}