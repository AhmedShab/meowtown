var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var catsObj = require('./catsData')//.catsObj
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

app.get('/cats/:id', function(req,res){
  console.log(catsObj)
  console.log(req.params); // try going to /cats/1
  // take the catsObj and render which ever cat the user has selected
  res.render ('catsShow', catsObj.cats[req.params.id -1])

})

app.post('/cats', function(req,res) {
  console.log(req.body);
})

module.exports = app;
