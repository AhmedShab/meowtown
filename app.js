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
  {id: 1, name: 'fluffy', image_url: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg', life_story: 'a happy cat'},
  {id: 2, name: 'tick', image_url: 'http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg', life_story: "a sad cat"}
 ]
};


app.get('/', function(req, res) {
 res.redirect('/cats'); // what is this doing?
});

app.get('/cats', function(req, res) {
 res.render('catsIndex', catsObj);
});

app.get('/cats/new', function(req, res) {
 res.render('catsNew');
});

app.get('/cats/:id', function(req,res){
  console.log(req.params);
  var cat = catsObj.cats[req.params.id - 1];
  console.log(cat);
  res.render('catsShow', cat); // try going to /cats/1
});

app.post('/cats', function(req,res) {
  console.log(req.body);
  var id = catsObj.cats.length;
  if (id !== req.body.id){
    req.body.id = id+1
    catsObj.cats.push(req.body)
    console.log(catsObj.cats)
  }
});

app.get('/cats/:id/edit', function(req, res){
  var cat = catsObj.cats[req.params.id - 1];
  res.render('catsEdit', cat)
})



module.exports = app;
