var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');
var auth = require('./auth.js');
var bcrypt = require('bcrypt-nodejs');
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

app.get('/usercategories/:id', async(req, res)=> {
  try {
    let user = await User.findById(req.params.id, '-password -__v');
    res.send(user.tracked_categories);
  } catch (error){
    console.log(error);
    res.sendStatus(500);
  }
});

/*
app.post('/user/:id/update', async(req, res)=> {
  User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, user) {
      if (err) return next(err);
      res.send('User updated.');
  });
});
*/

app.post('/user/:id/update', async(req, res)=> {
  User.findById(req.params.id, function (err, user) {
      user.username = req.body.username;
      user.password = req.body.password;
      user.email = req.body.email;
      user.name = req.body.name;
      user.birthdate = req.body.birthdate;
      user.gender = req.body.gender;
      user.save();
      res.send('User updated.');
  });
});

app.post('/addcategory', (req, res)=> {
  let categoryData = req.body;
  let category = new Category(categoryData);

  category.save((err, result)=> {
    if(!err) {
      console.log(category);
      res.status(200).send({'name': category.name, 'experiences': category.experiences});

    } else {
      console.log(err.errmsg);
      if (err.code == 11000) {
        res.status(422).send(['That category already exists']);
        console.log('Category exists');
      } else {
        return next(err);
      }    }
  })
});

app.post('/addusercategory/:id', async(req, res)=> {
  let categoryData = {'name': req.body.name, 'experiences': req.body.experiences}
  User.findByIdAndUpdate(req.params.id, {$push: {tracked_categories: categoryData}}, function (err, user) {
      if (err) return next(err);
      res.send(req.body);
  });
});

app.post('/adduserexperience/:id/:tracked_category', async(req, res)=>{
  let experienceData = req.body;
  console.log(experienceData);
  User.update({'tracked_categories.name': req.params.tracked_category},
              {'$push': {
                          'tracked_categories.$.experiences': experienceData
                       }
              }, function (err, user) {
                if (err) return next(err);
                res.send(req.body);
              });
});

mongoose.set('useFindAndModify', false);
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
