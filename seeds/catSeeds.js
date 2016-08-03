
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cats').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('cats').insert({id: 1, catName: 'fluffy',
          photoURL: "http://www.top13.net/wp-content/uploads/2015/10/perfectly-timed-funny-cat-pictures-5.jpg",
          lifeStory: 'A little cat was born and dreamed of greatness'}),
        knex('cats').insert({id: 2, catName: 'tick',
          photoURL: "https://www.petfinder.com/wp-content/uploads/2012/11/140272627-grooming-needs-senior-cat-632x475.jpg",
          lifeStory: 'I just latched on and sucked the life blood of my owner'}),
        ]);
    });
};
