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

var dataStore = {
 cats: [
  {id: 1, name: 'fluffy'},
  {id: 2, name: 'tick'}
 ]
}

app.get('/', function(req, res) {
 res.redirect('/cats') // redirects from index to the cats list page
})

app.get('/cats', function(req, res) {
 res.render('catsIndex', dataStore)
})

app.get('/cats/new', function(req, res) {
 res.render('catsNew')
})

app.get('/cats/:id', function(req,res){
  //console.log(req.params); // try going to /cats/1 --> logs {id: '1'}
  var catId = Number(req.params.id) //this should pull out '1'
  chosenCat = dataStore.cats[catId-1]
  //console.log("this is the chosenCat object: ", chosenCat)
  res.render('catsShow', chosenCat)
})

app.post('/cats', function(req,res) {
  console.log(req.body);
})

module.exports = app;
