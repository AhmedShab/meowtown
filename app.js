var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./knexfile').development
var knex = require('knex')(config)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//---------------------Ignore above here-------------------//

function logError (err) {
  console.log('Bother: ', err)
}

//---------------------Shared functions above here---------//


// redirects from index to the cats list page
app.get('/', function(req, res) {
 res.redirect('/cats')
})

//displays the main list of cats
app.get('/cats', function(req, res) {
  knex('cats')
    .then (function (data){
    res.render('catsIndex', {cats: data})
    })
    .catch(logError)
})

//displays pages for individual cats
app.get('/cats/:id', function(req,res){
  var num = Number(req.params.id)
  knex('cats')
    .where('id', num)
    .then (function (cat) {
      res.render('catsShow', cat[0])
    })
})




app.get('/cats/new', function(req, res) {
 res.render('catsNew')
})

app.get('/cats/edit/:id', function(req,res){
  editingCat = dataStore.cats[req.params.id-1] //get the cat to be edited
  console.log("this is the cat we're editing: ", editingCat)
  res.render('catsEdit', editingCat)//somehow pull data from the cat and shows it
  //saves back - post? - to the same object
})

app.post('/cats/:id', function(req,res){
  console.log("this is what the form send into the ether: ", req.body);
  editingCat = dataStore.cats[req.params.id-1]
  editingCat.name = req.body.name
  editingCat.photo = req.body.image
  editingCat.lifeStory = req.body.life_story
  res.redirect('/cats/' + (req.params.id) )
})




app.post('/cats', function(req,res) {
  console.log(req.body);
  //put a new cat in the dataStore
  var newCat = {
    id: dataStore.cats.length + 1,
    name: req.body.name,
    photo: req.body.image,
    lifeStory: req.body.life_story
  }
  dataStore.cats.push(newCat)//push new cat object to dataStore
  res.redirect('/cats/')
})

module.exports = app;
