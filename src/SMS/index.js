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

  sendSMS = ({ from, to, text, ...options }) => {
    if (!this.authString) {
      throw new Error('Please provide your account information first');
    }
    return sendSMS({ accountSID: this.accountSID, authString: this.authString, from, to, text, ...options });
  }

  getSMS = (messageSID) => {
    if (!this.authString) {
      throw new Error('Please provide your account information first');
    }
    return getSMS({ accountSID: this.accountSID, authString: this.authString, messageSID });
  }
}

module.exports = SMS;
