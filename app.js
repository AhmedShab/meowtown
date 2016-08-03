var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var queries = require('./queries');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//---------------------Ignore above here-------------------//


app.get('/', function(req, res) {
 res.redirect('/cats'); // what is this doing?
});

app.get('/cats', function(req, res) {

  queries.getCats()
  .then(function (cats) {
    res.render('catsIndex', {cats: cats});
  })
  .catch(logError);
});

app.get('/cats/new', function(req, res) {
 res.render('catsNew');
});

app.get('/cats/:id', function(req,res){
  console.log(req.params); // try going to /cats/1
});

app.post('/cats', function(req,res) {
  queries.insertCat(req.body.name, req.body.image, req.body.life_story)
  .catch(logError);
  res.redirect('/cats');
});


function logError(err) {
  console.error(err.message);
  res.status(500).send("Can't display cats!");
}

module.exports = app;
