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
  {id: 1, name: 'Ferry Bubbles', image:'', life_story: "I like bubbles"},
  {id: 2, name: 'Tick', image:'', life_story: "I like tic-tac-toe "},
  {id: 3, name: 'Montmorency', image:'', life_story: "My owner is English"},
  {id: 4, name: 'bellybutton', image:'', life_story: " No clue why I have such a name "}
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
  console.log(req.params); // try going to /cats/1

res.render('catsShow', catsObj.cats[req.params.id -1])
})
// looking for cat with id 1 in catsObj {id: 1, name: 'Amaan'}
// take the cat data and the template and res.render them together
// template is catsShow


app.post('/cats', function(req,res) {
  console.log(req.body);
  catsObj.cats.push(req.body);
})


module.exports = app;
