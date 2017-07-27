var express = require('express')
var app = express();

app.set('view engine', 'pug')
app.use(express.static('./public'))

var server = require('http').Server(app);
var io = require('socket.io')(server);

const Twitter = require('node-tweet-stream')
const config = require('./lib/config.js')

const t = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET,
    token: process.env.ACCESS_TOKEN,
    token_secret: process.env.ACCESS_TOKEN_SECRET
})

app.get('/', function (req, res) {
  res.render('index');
});

t.track('tachira')

io.on('connection', function (socket) {
    t.on('tweet', function (tweet) {
      socket.emit('tweet', tweet); 
      console.log(tweet.text) 
    })
        
    t.on('error', function (err) {
        socket.emit('err', err);
    })
});

server.listen(80);