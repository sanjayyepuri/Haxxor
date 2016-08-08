var jackrabbit = require('jackrabbit');

var rabbit = jackrabbit("amqp://localhost:5672");
var exchange = rabbit.default();
var hello = exchange.queue({ name: 'task_queue', durable: true });

hello.consume(onGreet);

function onGreet(data, ack) {
  console.log(JSON.stringify(data));
  ack();
}