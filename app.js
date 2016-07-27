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
  {id: 1, name: 'fluffy', image: "https://pbs.twimg.com/profile_images/706844157093027840/2Aan_aSU.jpg", life_story: 'I am fluffy'},
  {id: 2, name: 'tick' , image: "https://pbs.twimg.com/profile_images/706844157093027840/2Aan_aSU.jpg", life_story: 'I have ticks'},
  {id: 4, name: 'business cat' , image: "https://pbs.twimg.com/profile_images/706844157093027840/2Aan_aSU.jpg", life_story: 'I am a cat'}
 ]
}
var catsLength = catsObj.cats.length
var idCount = catsObj.cats[catsLength-1].id


console.log("id count", idCount)
console.log("cats obj ", catsLength)

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
  var catsFilter = catsObj.cats.filter(function(cat){
    return cat.id == req.params.id
  })
  console.log("Cats Filterd", catsFilter)
  res.render("catsShow", catsFilter[0])
})

app.post('/cats', function(req,res) {
  var newObj = req.body
  newObj.id = idCount+1
  catsObj.cats.push(newObj)
  res.send(catsObj)
  res.render('catsIndex', catsObj)

  console.log("this is req query ", req, "htis is res query ", res);
})

module.exports = app;
