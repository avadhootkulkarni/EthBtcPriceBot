const TeleBot = require('telebot');
const bot = new TeleBot('token');

bot.on('text', (msg) => msg.reply.text(msg.text));

bot.start();
