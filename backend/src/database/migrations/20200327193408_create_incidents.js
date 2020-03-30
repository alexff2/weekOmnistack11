
exports.up = (knex) => {
  return knex.schema.createTable('incidents', (table) => {
    table.increments()
    table.string('title').notNullable()
    table.string('description').notNullable()
    table.decimal('value').notNullable()
    table.string('ongs_id').notNullable()
    table.foreign('ongs_id').references('id').inTable('ongs')
  })
}

exports.down = (knex) => {
  return knex.schema.dropTable('incidents')
}