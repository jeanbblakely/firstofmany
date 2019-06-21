var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('jwt-simple');

var User = require('./models/user.js');
var Experience = require('./models/experience.js');
var Category = require('./models/category.js');

var router = express.Router();

router.post('/register', (req, res)=> {
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
      res.status(200).send({token});
      console.log("User ID: " + user._id + "\nUsername: " + user.username);
    }
  });

  module.exports = router;
