"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _require = require('../utils/fetch'),
    fetch = _require.fetch; // eslint-disable-next-line no-unused-vars, object-curly-newline


function sendSMS(_ref) {
  var accountSID = _ref.accountSID,
      authString = _ref.authString,
      options = _objectWithoutProperties(_ref, ["accountSID", "authString"]);

  if (!options.from || !options.to || !options.text) {
    throw new Error('Required parameters not present. Please provide at least the "from", "to", and "text" parameters');
  }

  return fetch("https://api.apifonica.com/v2/accounts/".concat(accountSID, "/messages"), options, {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
    Authorization: authString
  }, 'POST').then(function (res) {
    console.log('Message created', res);
    return res;
  })["catch"](function (e) {
    console.log(e.statusText);
    return e;
  });
}

function getSMS(_ref2) {
  var authString = _ref2.authString,
      accountSID = _ref2.accountSID,
      messageSID = _ref2.messageSID;

  if (!messageSID) {
    throw new Error('Provide a message SID');
  }

  return fetch("https://api.apifonica.com/v2/accounts/".concat(accountSID, "/messages/").concat(messageSID), undefined, {
    'Content-Type': 'application/json',
    'cache-control': 'no-cache',
    Authorization: authString
  }).then(function (res) {
    console.log('Message:', res);
    return res;
  })["catch"](function (e) {
    console.log(e.statusText);
    return e;
  });
}

module.exports = {
  sendSMS: sendSMS,
  getSMS: getSMS
};