var knexConfig = require('./knexfile').development;
var knex = require('knex')(knexConfig);


function getCats() {
  return knex('cats').select();
}

function insertCat(name, image, life_story) {
  return knex('cats').insert({name: name, image: image, life_story: life_story});
}


module.exports = {
  getCats: getCats,
  insertCat: insertCat
};



function logError (err) {
  console.log('Dang, we exploded like a bomb: ', err);
}
