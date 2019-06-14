var express = require('express');
var app = express();

const port = 3000;

app.get('/', (req, res)=> {
  console.log("web browser opened");
  res.send("Welcome to the First of Many App");
});

app.listen(port);
