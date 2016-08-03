
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cats').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('cats').insert({name: 'fluffy', image: 'https://i.ytimg.com/vi/mW3S0u8bj58/maxresdefault.jpg', life_story: 'happy cat'}),
        knex('cats').insert({name: 'tick', image: 'http://www.cats.org.uk/uploads/branches/211/5507692-cat-m.jpg', life_story: 'funny cat'}),
      ]);
    });
};
