var express = require('express');
var cors = require('cors');
var app = express();

const port = 3000;

var posts = [
  { message: "test" },
  { message: "test2" }
]

app.use(cors());

app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

app.get('/posts', (req, res)=> {
  console.log("web browser opened");
  res.send(posts);
});

app.listen(port);
