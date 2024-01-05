const amqp = require('amqplib');

async function receiveMessage(queue) {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {
    durable: false
  });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
  channel.consume(queue, (msg) => {
    console.log(" [x] Received %s", msg.content.toString());
  }, {
    noAck: true
  });
}

module.exports = { receiveMessage };
