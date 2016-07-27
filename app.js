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
  var id = catsObj.cats.length;

  // var isExists = findCatID();
  //
  // console.log(isExists);
  //
  // if (isExists) {
  //   console.log("cat already exists");
  //   catsObj.cats[isExists.id - 1] = req.body.name;
  //   catsObj.cats[isExists.id - 1] = req.body.image_url;
  //   catsObj.cats[isExists.id - 1] = req.body.life_story;
  //
  // }
  // else {
// var stop = false;
// for(i=0; i < catsObj.cats.length; i++){
//   if(catsObj.cats[i].id){
//     catsObj.cats[i].name = req.body.name;
//     catsObj.cats[i].image_url = req.body.image_url;
//     catsObj.cats[i].life_story = req.body.life_story;
//     stop = true;
//     console.log(catsObj.cats, 'this is the complete cat list after change');
//     break;
  // }
// }
// if (stop === false){
//   req.body.id = id+1;
//   catsObj.cats.push(req.body);
//   console.log(catsObj.cats, "This is the complete list after new");
//   // console.log(app.locals.id);
// }

  var newCat = findCatID();

  console.log(newCat);

  if (newCat === undefined) {
    console.log("this is an old cat");
  }
  else {
    req.body.id = id+1;
    catsObj.cats.push(req.body);
    console.log(catsObj.cats, 'new cat');
  }

});

app.get('/cats/edit/:id', function(req, res){  // take this cat's id and edit it's profile
  var cat = catsObj.cats[req.params.id - 1];
  app.locals.id = cat.id;
  // console.log(app.locals.id);
  res.render('catsEdit', cat);
});

function findCatID() {
  return catsObj.cats.filter(function (prop) {
    return prop.id === app.locals.id;
  });
}



module.exports = app;
