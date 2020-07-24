import Message from './index';

class SMS extends Message {
  channel = 'sms';

  setMediaURL = () => {}

  setType = () => {}
}

module.exports = SMS;
