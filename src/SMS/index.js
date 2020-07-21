const { sendSMS, getSMS } = require('../api/index.js');

class SMS {
  authString = null;

  accountSID = null;

  constructor({ accountSID, authToken }) {
    if (!accountSID || !authToken) {
      throw new Error('Please provide your account information');
    }
    this.accountSID = accountSID;
    this.authToken = authToken;
    const authbtoa = Buffer.from(`${accountSID}:${authToken}`).toString('base64');
    this.authString = `Basic ${authbtoa}`;
  }

  // eslint-disable-next-line object-curly-newline, camelcase
  sendSMS = (options) => {
    if (!this.authString) {
      throw new Error('SMS API not initialized');
    }
    // eslint-disable-next-line object-curly-newline
    return sendSMS({ accountSID: this.accountSID, authString: this.authString, ...options });
  }

  getSMS = (messageSID) => {
    if (!this.authString) {
      throw new Error('SMS API not initialized');
    }
    // eslint-disable-next-line object-curly-newline
    return getSMS({ accountSID: this.accountSID, authString: this.authString, messageSID });
  }
}

module.exports = SMS;
