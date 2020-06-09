const express = require("express");
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const os = require('os');
const secTimer = 180;
let countdown = secTimer;

setInterval( () => {
  countdown = countdown>0 ? countdown-1: secTimer;
  io.emit('timer', { countdown });
  console.log(countdown)
}, 1000);

io.on('connection', socket => {
  socket.on('reset', data => {
    countdown = 180;
    io.emit('timer', { countdown });
  })
  console.log('a user connected');
});

app.set('view engine', 'ejs');
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render('index');
});

// listen for requests :)
const listener = http.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
