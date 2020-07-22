const { fetchJson } = require('../utils/fetch');

// eslint-disable-next-line no-unused-vars, object-curly-newline
async function sendSMS({ accountSID, authString, from, to, text, ...options }) {
  if (!from || !to || !text) {
    throw new Error('Required parameters not present. Please provide at least the "from", "to", and "text" parameters');
  }
  try {
    const result = await fetchJson(
      `${accountSID}/messages`,
      { from, to, text, ...options },
      {
        Authorization: authString,
      },
      'POST',
    );
    if (result.uri) {
      const arr = result.uri.split('/');
      const msg = arr[arr.length - 1];
      return {
        success: true,
        message_sid: msg,
      };
    }
    throw new Error({ messageText: 'Could not send SMS', result });
  } catch (err) {
    return err;
  }
}

async function getSMS({ authString, accountSID, messageSID }) {
  if (!messageSID) {
    throw new Error('Provide a message SID');
  }
  try {
    const result = await fetchJson(
      `${accountSID}/messages/${messageSID}`,
      undefined,
      {
        Authorization: authString,
      },
    );
    if (result.created) {
      result.created = new Date(result.created);
    }
    return result;
  } catch (err) {
    return err;
  }
}

module.exports = {
  sendSMS,
  getSMS,
};
