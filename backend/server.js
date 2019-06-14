var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const port = 3000;

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
  console.log(userData);
  res.sendStatus(200);
});

app.listen(port);
