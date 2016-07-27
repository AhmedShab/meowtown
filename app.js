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
  {id: 1,
    name: 'fluffy',
    photo: "http://www.top13.net/wp-content/uploads/2015/10/perfectly-timed-funny-cat-pictures-5.jpg",
    lifeStory: 'In a galaxy far, far away... a little cat was born and dreamed of greatness'},
  {id: 2,
    name: 'tick',
    photo: "https://www.petfinder.com/wp-content/uploads/2012/11/140272627-grooming-needs-senior-cat-632x475.jpg",
    lifeStory: 'I just latched on and sucked the life blood of my owner'}
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

app.get('/cats/edit/:id', function(req,res){
  editingCat = dataStore.cats[req.params.id-1] //get the cat to be edited
  console.log("this is the cat we're editing: ", editingCat)
  res.render('catsEdit', editingCat)//somehow pull data from the cat and shows it
  //saves back - post? - to the same object
})

app.post('/cats/:id', function(req,res){
  console.log("this is what the form send into the ether: ", req.body);
  editingCat = dataStore.cats[req.params.id-1]
  editingCat.name = req.body.name
  editingCat.photo = req.body.image
  editingCat.lifeStory = req.body.life_story
  res.redirect('/cats/' + (req.params.id) )
})


app.get('/cats/:id', function(req,res){
  var catId = Number(req.params.id) //this should pull out '1'
  chosenCat = dataStore.cats[catId-1]
  res.render('catsShow', chosenCat)
})

app.post('/cats', function(req,res) {
  console.log(req.body);
  //put a new cat in the dataStore
  var newCat = {
    id: dataStore.cats.length + 1,
    name: req.body.name,
    photo: req.body.image,
    lifeStory: req.body.life_story
  }
  dataStore.cats.push(newCat)//push new cat object to dataStore
  res.redirect('/cats/')
})

module.exports = app;
