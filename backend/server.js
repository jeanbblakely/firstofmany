var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var auth = require('./auth.js');

const path = require('path');

const port = process.env.PORT || 3000;

var User = require('./models/user.js');
var Experience = require('./models/experience.js');
var Category = require('./models/category.js');

var posts = [
  { message: "test" },
  { message: "test2" }
]

app.use(cors());
app.use(bodyParser.json());

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

  app.get('/users', async(req, res)=> {
    try {
      let users = await User.find({}, '-password -__v');
      res.send(users);
    } catch (error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/categories', async(req, res)=> {
    try {
      let categories = await Category.find({});
      res.send(categories);
    } catch (error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.get('/experiences', async(req, res)=> {
    try {
      let experiences = await Experience.find({});
      res.send(experiences);
    } catch (error){
      console.log(error);
      res.sendStatus(500);
    }
  });

app.get('/user/:id', async(req, res)=> {
  try {
    let user = await User.findById(req.params.id, '-password -__v');
    res.send(user);
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});


app.post('/newcategory', (req, res)=> {
  let categoryData = req.body;
  let category = new Category(categoryData);

  category.save((err, result)=> {
    if(err) {
      console.log(err.errmsg);
    } else {
      console.log(category.name);
      res.sendStatus(200);
    }
  })
});


mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://joeymarinelli:Katiemarie0629!@cluster0-yrzrs.mongodb.net/FirstOfManyDB?retryWrites=true&w=majority',
                  { useNewUrlParser: true },
                  (err)=> {
                      if(!err) {
                        console.log('Connected to First of Many Mongo DB!');
                      }
});

app.use('/auth', auth);
app.listen(port);
