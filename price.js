const TeleBot = require('telebot');
var request = require('request');
const bot = new TeleBot({
    token: 'token',
    usePlugins: ['commandButton']
});

// Command /start
bot.on('/start', msg => {

    // Inline keyboard markup
    const replyMarkup = bot.inlineKeyboard([
        [
            // First row with command callback button
            bot.inlineButton('Bitcoin (in USD)', {callback: '/btc'})
        ],
        [
            // Second row with regular command button
            bot.inlineButton('Ether (in USD)', {callback: '/eth'})
        ]
    ]);

    // Send message with keyboard markup
    return bot.sendMessage(msg.from.id, 'Check the current price of:', {replyMarkup});

});

// Command /hello
bot.on('/btc', msg => {
  request({url: 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD', json: true}, function(err, res, json) {
    if (err) {
      throw err;
    }
    return bot.sendMessage(msg.from.id, json.USD);
  });
});

bot.on('/eth', msg => {




 request({url: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD', json: true}, function(err, res, json) {
   if (err) {
     throw err;
   }
   return bot.sendMessage(msg.from.id, json.USD);
 });




});

// Button callback
bot.on('callbackQuery', (msg) => {

    console.log('callbackQuery data:', msg.data);
    bot.answerCallbackQuery(msg.id);

});

bot.start();
