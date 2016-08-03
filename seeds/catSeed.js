
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cats').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('cats').insert({"id": 1, "name": "Fluffy", "imgUrl": "https://i.ytimg.com/vi/0FEYvKxCnYw/maxresdefault.jpg", "lifeStory": "I'm up to life 7"}),
        knex('cats').insert({"id": 2, "name": "Tick", "imgUrl": "https://s-media-cache-ak0.pinimg.com/236x/59/77/cc/5977cc1ff2e1c6ebfc5a5e3014f62efb.jpg", "lifeStory": "Lived a life of luxury"})
      ]);
    });
};
