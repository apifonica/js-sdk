### Example usage:

##### Send message

```javascript
const SMS = require('@apifonica/sms-sdk');

// initialize with your account credentials
const sms = new SMS({
  accountSID: ACCOUNT SID,
  authToken: AUTHORIZATION TOKEN,
});

// the three required options are "from", "to", and "text"
// other options are "msg_app_sid", "channel", "type", "url", "tag"
const options = {
  from: NUMBER TO SEND FROM,
  to: RECIPIENT NUMBER,
  text: MESSAGE TEXT,
};

// the sendSMS method returns a promise
sms.sendSMS(options)
  .then(console.log)
  .catch(console.log);
```

See detailed API information at <https://www.apifonica.com/en/docs/api/rest/send-message/>

##### Get message details

```javascript
// the getSMS method also returns a promise. 
// It expects the SID of the message you're trying to look up
sms.getSMS(message_sid)
  .then(console.log)
  .catch(console.log);
```

See detailed API information at <https://www.apifonica.com/en/docs/api/rest/get-message-info/>