import Message from './index';

class TelegramMessage extends Message {
  channel = 'telegram';
}

module.exports = TelegramMessage;
