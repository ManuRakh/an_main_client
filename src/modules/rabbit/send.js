const amqp = require('amqplib');
const { queues } = require('../utils/queues');

async function sendMessage(queue, message) {
  try {
    if (!queues.includes(queue)) throw new Error("Invalid queue");
    if (!message.action) throw new Error("Invalid message");
    if (!message.object_type) throw new Error("Invalid object type");
  
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, {
      durable: false
    });
  
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    // console.log(" [x] Sent %s", message);
  
    setTimeout(() => {
      connection.close();
    }, 500);
  } catch (e) {
    console.log(e);
  }

}

module.exports = { sendMessage };
