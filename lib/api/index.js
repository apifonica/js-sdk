const { fetch } = require('../../utils/fetch');

// eslint-disable-next-line no-unused-vars, object-curly-newline
function sendSMS({ accountSID, authString, ...options }) {
  if (!options.from || !options.to || !options.text) {
    throw new Error('Required parameters not present. Please provide at least the "from", "to", and "text" parameters');
  }
  return fetch(
    `https://api.apifonica.com/v2/accounts/${accountSID}/messages`,
    options,
    {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      Authorization: authString,
    },
    'POST',
  )
    .then((res) => {
      console.log('Message created', res);
      return res;
    })
    .catch((e) => {
      console.log(e.statusText);
      return e;
    });
}

function getSMS({ authString, accountSID, messageSID }) {
  if (!messageSID) {
    throw new Error('Provide a message SID');
  }
  return fetch(
    `https://api.apifonica.com/v2/accounts/${accountSID}/messages/${messageSID}`,
    undefined,
    {
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
      Authorization: authString,
    },
  )
    .then((res) => {
      console.log('Message:', res);
      return res;
    })
    .catch((e) => {
      console.log(e.statusText);
      return e;
    });
}

module.exports = {
  sendSMS,
  getSMS,
};
