var express = require('express');
var router = express.Router();

var fs = require('fs');



var multer  = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, req.params.competitor+'.java')
  }
});
var upload = multer({ storage: storage });

var input = [
    '',
    'cabbage\npoop\nfood',
    '',
    '5 6\n4 3\n9 9',
    'dog cat\nword odd\ndeer bear'
]
var out = [
    'Hello World\n',
    'I love cabbage\nI love poop\nI love food\n',
    '5050\n',
    '30\n12\n81\n',
    'dogcat\nwordodd\ndeerbear\n'
]

/* GET home page. */
router.get('/user/:competitor', function(req, res, next) {
  res.render('index', { title: req.params.competitor });
});

router.post('/user/:competitor/upload',upload.single('program') ,function(req, res, next) {

  var jackrabbit = require('jackrabbit');

  var rabbit = jackrabbit("amqp://localhost:5672");
  var exchange = rabbit.default();
  var hello = exchange.queue({ name: 'task_queue', durable: true });


  var content;
  var client = req.params.competitor;
  fs.readFile('./uploads/' + client +'.java','UTF-8', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;
    console.log(data);
    exchange.publish({client: client, submission: data, input: '', output: 'hello world\n', namespace: 'random-guid' }, { key: 'task_queue' });
    exchange.on('drain', rabbit.close);
    res.redirect('/user/' + client);
    //res.json({client: client, submission: data, input: '', output: 'hello world', namespace: 'random-guid' });
  });
  
  
  
});


module.exports = router;
