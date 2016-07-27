var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs')
var catsObj = require('./data/catsObj.json')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//---------------------Ignore above here-------------------//



// var catsObj = {
//  cats: [
//   {id: 1, name: 'fluffy', image: "https://pbs.twimg.com/profile_images/706844157093027840/2Aan_aSU.jpg", life_story: 'I am fluffy'},
//   {id: 2, name: 'tick' , image: "https://pbs.twimg.com/profile_images/706844157093027840/2Aan_aSU.jpg", life_story: 'I have ticks'},
//   {id: 3, name: 'business cat' , image: "https://pbs.twimg.com/profile_images/706844157093027840/2Aan_aSU.jpg", life_story: 'I am a cat'}
//  ]
// }
var catsLength = catsObj.cats.length
var idCount = catsObj.cats[catsLength-1].id

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

  res.render("catsShow", catsFilter[0])
})


app.post('/cats', function(req,res) {
  var newObj = req.body
  newObj.id = idCount+1
  console.log("this is req body", req.body)
  catsObj.cats.push(newObj)
  writeAsync()
  res.render('catsIndex', catsObj)

  function writeAsync() {
    var catsFile = path.join(__dirname, 'data/catsObj.json')
    var catsString = JSON.stringify(catsObj, null, 2)
    fs.writeFile(catsFile, catsString, function(err) {
      if (!err) {
        verifyExists(catsString)
      }
    })
  }

  function verifyExists (catsString) {
    fs.exists(catsString, function(exists) {
      console.log(catsString, 'exists:', exists)
    })
  }
})

module.exports = app;
