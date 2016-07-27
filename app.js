var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var catDB = require('./catsData')//.catDB
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
 res.render('catsIndex', catDB)
})

app.get('/cats/new', function(req, res) {
 res.render('catsNew')
})

app.get('/cats/:id', function(req,res){
  console.log(catDB)
  console.log(req.params); // try going to /cats/1
  // take the catDB and render which ever cat the user has selected
  res.render ('catsShow', catDB.cats[req.params.id -1])

})

app.post('/cats', function(req,res) {
  var newCat = req.body
  console.log(newCat); //req.body.var_name
  // end(catDB)
  //newCats.id = findLastCat id +1
  catDB.cats.push(newCat);
  res.redirect('/cats')
  // res.send('POST requst to the homepage')
})

module.exports = app;
