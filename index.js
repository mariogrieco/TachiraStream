var express = require('express')
var app = express()

app.set('view engine', 'pug')
app.use(express.static('./public'))
app.set('port', (process.env.PORT || 80));

var server = require('http').Server(app)
var io = require('socket.io')(server)

var Twitter = require('node-tweet-stream')

// server
var t = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET,
    token: process.env.ACCESS_TOKEN,
    token_secret: process.env.ACCESS_TOKEN_SECRET
})

// Localhost
// var conf = require('./credentials.js')
// var t = new Twitter({
//     consumer_key: conf.API_KEY,
//     consumer_secret: conf.API_SECRET,
//     token: conf.ACCESS_TOKEN,
//     token_secret: conf.ACCESS_TOKEN_SECRET
// })

t.track('tachira')
// t.track('sancristobal')
t.track('app30jtachira')

io.on('connection', function (socket) {
    
    t.on('tweet', function (tweet) {
        socket.emit('tweet', tweet)
    })
        
    t.on('error', function (err) {
        socket.emit('err', {text: 'err'})
    })
});

app.get('*', function (req, res) {
  res.render('index')
})

server.listen(app.get('port'));
