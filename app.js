var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//---------------------Ignore above here-------------------//

var catsObj = {
 cats: [
  {id: 1, name: 'Fluffy', image: 'https://i.ytimg.com/vi/0FEYvKxCnYw/maxresdefault.jpg', lifeStory: "I'm up to life 7"},
  {id: 2, name: 'Tick', image: 'https://s-media-cache-ak0.pinimg.com/236x/59/77/cc/5977cc1ff2e1c6ebfc5a5e3014f62efb.jpg', lifeStory: 'Lived a life of luxury'}
 ]
}

app.get('/', function(req, res) {
 res.redirect('/cats') // what is this doing?
})

app.get('/cats', function(req, res) {
 res.render('catsIndex', catsObj)
})

app.get('/cats/new', function(req, res) {
 res.render('catsNew')
})

app.get('/cats/:id', function(req,res){
  // doesn't use the id property of the cat -- problem?
  var catToRender = catsObj.cats.filter(function(cat) {return (cat.id == req.params.id)})[0]
  res.render('catsShow', catToRender);
})

app.get('/cats/edit/:id', function(req, res) {
  var catToRender = catsObj.cats.filter(function(cat) {return (cat.id == req.params.id)})[0]
  res.render('catsEdit', catToRender)
})

app.post('/cats/:id', function(req, res) {
  var catToEdit = catsObj.cats.filter(function(cat) {return (cat.id == req.params.id)})[0]
  catToEdit.name = req.body.name
  catToEdit.image = req.body.image
  catToEdit.lifeStory = req.body.life_story
  res.redirect('/cats/' + catToEdit.id)
})

app.post('/cats', function(req,res) {
  var newCat = {
    name: req.body.name,
    image: req.body.image,
    lifeStory: req.body.life_story
  }
  catsObj.cats.push(newCat)
})

module.exports = app;
