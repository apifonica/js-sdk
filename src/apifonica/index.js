const SMS = require('../Message/sms.js');
const TelegramMessage = require('../Message/telegram.js');
const FacebookMessage = require('../Message/facebook.js');

class Apifonica {
  authToken = null;

  accountSID = null;

  authString = null;

  constructor(accountSID, authToken) {
    if (!accountSID || !authToken) {
      throw new Error('Please provide your account information');
    }
    this.accountSID = accountSID;
    this.authToken = authToken;

    this.makeAuthString(accountSID, authToken);
  }

  makeAuthString = (accountSID, authToken) => {
    const authbtoa = Buffer.from(`${accountSID}:${authToken}`).toString('base64');
    this.authString = `Basic ${authbtoa}`;
  }

  newSMS = (from, to, text) => {
    const message = new SMS(this.accountSID, this.authString, from, to, text);
    return message;
  }

  newTelegramMessage = (from, to, text) => {
    const message = new TelegramMessage(this.accountSID, this.authString, from, to, text);
    return message;
  }

  newFacebookMessage = (from, to, text) => {
    const message = new FacebookMessage(this.accountSID, this.authString, from, to, text);
    return message;
  }
}

module.exports = Apifonica;
