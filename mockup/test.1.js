var jackrabbit = require('jackrabbit');

var rabbit = jackrabbit("amqp://localhost:5672");
var exchange = rabbit.default();
var hello = exchange.queue({ name: 'task_queue', durable: true });

exchange.publish({ name: 'Hunter' }, { key: 'task_queue' });
exchange.on('drain', process.exit);