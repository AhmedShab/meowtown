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
  res.render('catsShow', catsObj.cats[req.params.id -1]);
 console.log(req.params.id) // try going to /cats/1
})

app.post('/cats', function(req,res) {
  console.log(req.body);
})

module.exports = app;
