var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('jwt-simple');

var User = require('./models/user.js');
var Experience = require('./models/experience.js');
var Category = require('./models/category.js');
var bcrypt = require('bcrypt-nodejs');
var router = express.Router();

router.post('/register', (req, res, next)=> {
    let regData = req.body;
    let user = new User(regData);
    user.save((err, newUser)=> {
      if(!err) {
        let userID = newUser._id;
        let payload = { sub: newUser._id};
        let token = jwt.encode(payload, '123');

        res.status(200).send({token, userID});
        console.log(newUser.security_question + " " + newUser.security_answer);
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
      let token = jwt.encode(payload, '123');
      let userID = user._id;

      res.status(200).send({token, userID });
      console.log("User ID: " + user._id + "\nUsername: " + user.username);
    })

  });

  router.get('/getsecurityquestion', async(req, res)=> {
    try {
      let userData = req.body;
      let user = await User.findOne({username: userData.username});
      if (!user) {
        return res.status(404).send({message: "That username in not in our system"});
      }
      res.status(200).send(user.security_question);
    } catch (error){
      console.log(error);
      res.sendStatus(500);
    }
  });

  router.post('/resetpassword', async(req, res)=> {
    let userData = req.body;
    let user = await User.findOne({username: userData.username});
    if (!user) {
      return res.status(404).send({message: "User not found"})
    }
    bcrypt.compare(userData.security_answer, user.security_answer, (err, isMatch)=> {
      if(!isMatch) {
        return res.status(401).send({message:"That answer is incorrect. Please try again."});
      }
      user.password = userData.password;
      user.save();
      return res.status(200).send({message: "Your password has successfully been updated"});
    });


  });

  module.exports = router;
