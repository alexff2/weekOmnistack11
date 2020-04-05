const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connections')

describe('Tests of Ongs', () => {
  beforeEach( async () => {
    await connection.migrate.rollback()
    await connection.migrate.latest()
  })

  afterAll( async() => {
    await connection.destroy()
  })

  it('should be able to create a new ONG', async () => {
    const resp = await request(app)
     .post('/ongs')
     .send({
      name: "Ong Legal",
      email: "teste@teste.com",
      whatsapp: "9832447797 ",
      city: "São Luís",
      uf: "MA"
     })
    
    expect(resp.body).toHaveProperty('id')
    expect(resp.body.id).toHaveLength(8)
  })
})