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

app.get('cats/help', function(req,res){
  res.sendFile(--dirname + 'public/help.html')
})

//displays the main list of cats
app.get('/cats', function(req, res) {
  knex('cats')
    .then (function (data){
    res.render('catsIndex', {cats: data})
    })
    .catch(logError)
})

//shows the add cats page
app.get('/cats/new', function(req, res) {
  res.render('catsNew')
})

//displays pages for individual cats
app.get('/cats/:id', function(req,res){
  var num = Number(req.params.id)
  knex('cats')
    .where('id', num)
    .then (function (cat) {
      res.render('catsShow', cat[0])
    })
    .catch(logError)
})


//saving the data entered into the new cats page
app.post('/cats', function(req,res){
  var newCat = {
    catName: req.body.name,
    photoURL: req.body.image,
    lifeStory: req.body.life_story
  }
  knex('cats')
    .insert(newCat)
    .catch(logError)
  res.redirect('/cats/')
})

// getting to the form to edit an existing cat
app.get('/cats/edit/:id', function(req,res){
  var num = Number(req.params.id)
  knex('cats')
  .where('id', num)
  .then (function (cat) {
    res.render('catsEdit', cat[0])
  })
  .catch(logError)
})

//posting the data from the form for editing cats
app.post('/cats/:id', function(req,res){
  var num = Number(req.params.id)
  knex('cats')
  .where('id', num)
  .update({
    catName: req.body.name,
    photoURL: req.body.image,
    lifeStory: req.body.life_story
    })
  .then (function () {
    res.redirect('/cats/' + num)
  })
  .catch(logError)
  //res.redirect('/cats/')
})

// getting to the form to edit an existing cat
app.get('/cats/delete/:id', function(req,res){
  var num = Number(req.params.id)
  knex('cats')
  .where('id', num)
  .del()
  .catch(logError)
res.redirect('/cats/')
})


module.exports = app;
