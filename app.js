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
  {id: 1, name: 'fluffy', life_story: 'I am fluffy'},
  {id: 2, name: 'tick' , life_story: 'I have ticks'},
  {id: 3, name: 'cat' , life_story: 'I am a cat'}
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
  res.render("catsShow", catsObj.cats[req.params.id-1])

})

app.post('/cats', function(req,res) {
  // var newId =
  // var newName =
  // var newDescription =
  // var addingCat = "id: " + newId + "name: " + newName + "description: " + newDescription
  catsObj.cats.push(req.body)
  res.send(catsObj)
  res.render('catsIndex', catsObj)

  console.log("this is req query ", req, "htis is res query ", res);
})

module.exports = app;
