var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var catsObj = require('./cats.json')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//---------------------Ignore above here-------------------//


app.get('/', function(req, res) {
 res.redirect('/cats') // what is this doing?
})

app.get('/cats', function(req, res) {
 res.render('catsIndex', catsObj)
})

app.get('/cats/new', function(req, res) {
 res.render('catsNew')
})
app.get('/cats/help', function(req, res) {
  res.sendFile(__dirname + '/catsHelp.html')
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
