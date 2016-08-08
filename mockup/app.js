var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');



var app = express();
var socket_io = require('socket.io');

var io = socket_io();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var lobby = io.of('/random-guid');

 var current_round = 1;
 var num_competitors = 0;
 var competitors = new Object();


lobby.on('connection', function(socket){
  
  socket.on('client_handshake', function(data){
    //competitors[data.user] = 0;
    console.log(data.user + ' joined.');
    num_competitors++;
    if(num_competitors == 2){
      readyUp(lobby);
      
    }
  });
  
  socket.on('ready_up', function(data){
    
    console.log(data.user + ' ready.');
    num_competitors++;
    if(num_competitors == 2){
      readyUp(lobby);
      num_competitors = 0;
    }
  });

  socket.on('program_result', function(data){
    console.log(data);
    var res = JSON.parse(data);
    if(res.success === "true"){
      current_round++;
      if(current_round <= 5){
        if(competitors[res.user] === undefined){
          competitors[res.user]=0;
        }
        competitors[res.user]++;
        console.log(res.user + ' won round ' + current_round);
        console.log(competitors);
        lobby.emit('round_over', {winner: res.user, round: current_round});
        
      } 
      else {
        competitors[res.user]++;
        var winner = getWinner(competitors)
        console.log(JSON.stringify(competitors));
        console.log( winner + ' won the game');
        lobby.emit('game_won', {winner: winner});
        //competitors = new Object();
        //process.exit(); 
      }
    } else if(res.success === "false") {
      console.log(res.user + ' got it wrong.');
      lobby.emit('wrong_submission', {user: res.user})
    }
    
  });
  socket.emit('init_client', {round: current_round});
});
function readyUp(socket){
  console.log('Clients Ready.')
  socket.emit('start_round', {round : current_round});
}

function getWinner(competitors){
  var max = -1;
  var winner = '';
  for(var client in competitors){
   if(competitors[client] > max) {
     max = competitors[client];
     winner = client;
   }
  }

  return winner;
}
module.exports = app;
