const connection = require('../database/connections')

module.exports ={
  index: async (req, res) => {
    const ongs_id =  req.headers.authorization
    const incidents = await connection('incidents')
      .select('*')
      .where('ongs_id', ongs_id)

    return res.send(incidents)
  }
}