exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('cats', function (table) {
    table.increments('id').primary();
    table.string('name');
    table.string('image');
    table.string('life_story');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cats');
};
