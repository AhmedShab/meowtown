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
function logError(err){
  console.log('there was an error!: ', err)
}

app.get('/', function(req, res) {
 res.redirect('/cats')
})

app.get('/cats', function(req, res) {
  knex('cats')
    .then(function(data){
      res.render('catsIndex', {cats: data})
    })
    .catch(logError)
})

app.get('/cats/new', function(req, res) {
 res.render('catsNew')
})

app.get('/cats/help', function(req, res) {
  res.sendFile(__dirname + '/catsHelp.html')
})

app.get('/cats/:id', function(req,res){
  knex('cats')
    .then(function(data){
      var catToRender = data.filter(function(cat) {return (cat.id == req.params.id)})[0]
      res.render('catsShow', catToRender);
    })
})

app.get('/cats/edit/:id', function(req, res) {
  knex('cats')
    .where('id', req.params.id)
    .then(function(data){
      res.render('catsEdit', data[0])
    })
})


app.post('/cats/:id', function(req, res) {
  knex('cats')
    .where('id', req.params.id)
    .update({
        name: req.body.name,
        imgUrl: req.body.image,
        lifeStory: req.body.life_story
    })
    .catch(logError)
  res.redirect('/cats/' + req.params.id)
})

app.post('/cats', function(req,res) {
  knex('cats')
    .insert ({
      name: req.body.name,
      imgUrl: req.body.image,
      lifeStory: req.body.life_story
    })
    .then(function(data){
      res.redirect('/cats/')
    })
    .catch(logError)
})

module.exports = app;
