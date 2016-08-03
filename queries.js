var knexConfig = require('./knexfile').development;
var knex = require('knex')(knexConfig);


function getCats() {
  return knex('cats').orderBy('id', 'desc');
}

function insertCat(name, image, life_story) {
  return knex('cats').insert({name: name, image: image, life_story: life_story});
}

function getCatById(catId) {
  var id = catId.id;
  console.log(id);
  return knex('cats').where('id', id);
}


module.exports = {
  getCats: getCats,
  insertCat: insertCat,
  getCatById: getCatById
};
