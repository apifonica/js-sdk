import { sendSMS, getSMS } from '../api';

class Message {
  from = null;

  to = null;

  text = null;

  accountSID = null;

  authString = null;

  messageSID = null;

  messageAppSID = null;

  channel = null;

  url = null;

  tag = null;

  constructor(accountSID, authString, from, to, text) {
    if (!accountSID || !authString) {
      throw new Error('Please provide account credentials first');
    }
    if (!from || !to || !text) {
      throw new Error('Required parameters not present. Please provide at least the "from", "to", and "text" parameters');
    }
    this.accountSID = accountSID;
    this.authString = authString;
    this.from = from;
    this.to = to;
    this.text = text;
  }

  send = async () => {
    // take only non-null optional params
    const options = Object.entries({
      msg_app_sid: this.messageAppSID,
      channel: this.channel,
      type: this.type,
      url: this.url,
      tag: this.tag,
    })
      .reduce((acc, [key, value]) => (value === null ? acc : { ...acc, [key]: value }), {});

    const sentSMS = await sendSMS({
      accountSID: this.accountSID,
      authString: this.authString,
      from: this.from,
      to: this.to,
      text: this.text,
      ...options,
    });
    if (sentSMS.success) {
      this.messageSID = sentSMS.message_sid;
      return sentSMS;
    }

    const error = new Error('Could not send message');
    error.error = sentSMS;
    throw error;
  }

  checkStatus = () => {
    if (!this.messageSID) {
      throw new Error('Message has not been sent');
    }
    return getSMS(
      this.accountSID,
      this.authString,
      this.messageSID,
    );
  }

  setMessageAppSID = (messageAppSID) => {
    this.messageAppSID = messageAppSID;
    return this;
  }

  setType = (type) => {
    this.type = type;
    return this;
  }

  setMediaURL = (url) => {
    this.url = url;
    return this;
  }

  setTag = (tag) => {
    this.tag = tag;
    return this;
  }
}

module.exports = Message;
