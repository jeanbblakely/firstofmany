var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

const port = 3000;

var User = require('./models/user.js');

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

app.post('/register', (req, res)=> {
  let userData = req.body;
  let user = new User(userData);

  user.save((err, result)=> {
    if(err) {
      console.log(err.errmsg);
    } else {
      console.log(user.favorites[0]);
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
