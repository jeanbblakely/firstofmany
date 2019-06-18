var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jwt-simple');

const port = 3000;

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

app.get('/posts', (req, res)=> {
  res.send(posts);
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

app.post('/account', (req, res)=> {
  let userData = req.body;
  let user = new User(userData);

  user.save((err, result)=> {
    if(err) {
      console.log(err.errmsg);
    } else {
      res.sendStatus(200);
    }
  })
});

app.post('/login', async (req, res)=> {
  let userData = req.body;
  let user = await User.findOne({username:userData.username});

  if (!user) {
    return res.status(401).send({message:"Username or Password Invalid"});
  } else if (userData.password != user.password) {
    return res.status(401).send({message:"Username or Password Invalid"});
  } else {
    let payload = {};
    let token = jwt.encode(payload, '123456');
    res.status(200).send({token});
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



mongoose.connect('mongodb+srv://joeymarinelli:Katiemarie0629!@cluster0-yrzrs.mongodb.net/FirstOfManyDB?retryWrites=true&w=majority',
                  { useNewUrlParser: true },
                  (err)=> {
                      if(!err) {
                        console.log('Connected to First of Many Mongo DB!');
                      }
});


app.listen(port);
