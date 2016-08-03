
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('cats', function (table) {
      table.increments('id').primary()
      table.string('catName')
      table.string('photoURL')
      table.string('lifeStory')
      table.integer('owner_id').references('owners.id')
    }),
    knex.schema.createTableIfNotExists('owners', function (table){
      table.increments('id').primary()
      table.string('ownerName')
      table.string('ownerEmail')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cats'),
    knex.schema.dropTable('owners')
  ])
};
