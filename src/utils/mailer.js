const amqp = require('amqplib');
const rabbitmqUrl = process.env.RABBITMQ_HOST || 'localhost'
const url = `amqp://guest:guest@${rabbitmqUrl}/`;
const queue = 'email-service';

class Mailer {
    channel;

    async send(email, subject, message) {
        const channel = await this.getChannel();
        const content = {
            email: email,
            subject: subject,
            message: message,
        }
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(content)));
    }

    async getChannel() {
        if (!this.channel) {
            const connection = await amqp.connect(url);
            this.channel = await connection.createChannel();
            await this.channel.assertQueue(queue, {
                durable: false
            });
        }
        return this.channel;
    }
}

module.exports = new Mailer();


