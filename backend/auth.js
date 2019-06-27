var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('jwt-simple');

var User = require('./models/user.js');
var Experience = require('./models/experience.js');
var Category = require('./models/category.js');

var router = express.Router();

router.post('/register', (req, res, next)=> {
    let userData = req.body;
    var user = new User(userData);
    user.save((err, doc)=> {
      if(!err) {
        let userID = user._id;
        res.status(200).send({userID});
      } else {
          console.log(err.errmsg);
          if (err.code == 11000) {
            res.status(422).send(['Duplicate username or email']);
          } else {
            return next(err);
          }
      }
    })
  });

router.post('/login', async(req, res)=> {
    let userData = req.body;
    let user = await User.findOne({username:userData.username});

    if (!user) {
      return res.status(401).send({message:"Username or Password Invalid"});
    } else if (userData.password != user.password) {
      return res.status(401).send({message:"Username or Password Invalid"});
    } else {
      let payload = {};
      let token = jwt.encode(payload, '123456');
      let userID = user._id;

      res.status(200).send({token, userID});
      console.log("User ID: " + user._id + "\nUsername: " + user.username);
    }
  });

  module.exports = router;
