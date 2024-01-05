const amqp = require('amqplib');

const supportingQueues = ["math", "physics", "main"];

async function sendMessage(queue, message) {
  if (!supportingQueues.includes(queue)) throw new Error("Invalid queue");
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, {
    durable: false
  });

  channel.sendToQueue(queue, Buffer.from(message));
  console.log(" [x] Sent %s", message);

  setTimeout(() => {
    connection.close();
  }, 500);
}

module.exports = { sendMessage };
