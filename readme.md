#### Installation 

```javascript
npm install @apifonica/js-sdk
```

#### Initialization

```javascript
const Apifonica = require('@apifonica/js-sdk');

// initialize with your account credentials
const apifonica = new Apifonica(account_sid, auth_token);
```

#### Send a message
```javascript
const message = apifonica.newSMS(from, to, text);
// or
const message = apifonica.newTelegramMessage(from, to, text);
// or
const message = apifonica.newFacebookMessage(from, to, text);

message.send();  // returns a promise
```

#### Set optional parameters before sending

```javascript
  // set message app sid (Existing application SID which is used for Message operations)
  message.setMessageAppSID(messageAppSID);

  // set tag (Custom optional string field; can be used for custom client message filtering)
  message.setTag(tag);

  // set type (Type of content for Telegram/Facebook. Can be one of the following: image, gif, text, documentms, telegram, facebook)
  message.setType(type);

  // set url (URL where media content should be uploaded from)
  message.setMediaURL(url);
```

See detailed API information at <https://www.apifonica.com/en/docs/api/rest/send-message/>

#### Get message details

```javascript
message.checkStatus(); // returns a promise
```

See detailed API information at <https://www.apifonica.com/en/docs/api/rest/get-message-info/>