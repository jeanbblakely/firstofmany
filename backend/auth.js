var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('jsonwebtoken');
var secret = 'codeword';

var User = require('./models/user.js');
var Experience = require('./models/experience.js');
var Category = require('./models/category.js');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();

router.post('/register', (req, res, next)=> {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    user.name = req.body.name;
    user.birthdate = req.body.birthdate;
    user.gender = req.body.gender;
    user.temporarytoken = jwt.sign({ username: user.username, email: user.email }, secret, { expiresIn: '24h' });

    user.save((err, newUser)=> {
      if(!err) {
        let userID = newUser._id;
        let payload = { sub: newUser._id};
        let token = jwt.sign(payload, '123');
        res.status(200).send({message: 'Please check your email for activation link'});
    //    res.status(200).send({token, userID});
      } else {
          console.log(err.errmsg);
          if (err.code == 11000) {
            res.status(422).send({message: 'Duplicate username or email'});
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
    }

    bcrypt.compare(userData.password, user.password, (err, isMatch)=> {
      if(!isMatch) {
        return res.status(401).send({message:"Username or Password Invalid"});
      }

      let payload = { sub: user._id};
      let token = jwt.sign(payload, '123');
      let userID = user._id;

      res.status(200).send({token, userID });
      console.log("User ID: " + user._id + "\nUsername: " + user.username);
    })

  });

  module.exports = router;
