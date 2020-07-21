"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../api/index.js'),
    sendSMS = _require.sendSMS,
    getSMS = _require.getSMS;

var SMS = function SMS(_ref) {
  var _this = this;

  var accountSID = _ref.accountSID,
      authToken = _ref.authToken;

  _classCallCheck(this, SMS);

  _defineProperty(this, "authString", null);

  _defineProperty(this, "accountSID", null);

  _defineProperty(this, "sendSMS", function (options) {
    if (!_this.authString) {
      throw new Error('SMS API not initialized');
    } // eslint-disable-next-line object-curly-newline


    return sendSMS(_objectSpread({
      accountSID: _this.accountSID,
      authString: _this.authString
    }, options));
  });

  _defineProperty(this, "getSMS", function (messageSID) {
    if (!_this.authString) {
      throw new Error('SMS API not initialized');
    } // eslint-disable-next-line object-curly-newline


    return getSMS({
      accountSID: _this.accountSID,
      authString: _this.authString,
      messageSID: messageSID
    });
  });

  if (!accountSID || !authToken) {
    throw new Error('Please provide your account information');
  }

  this.accountSID = accountSID;
  this.authToken = authToken;
  var authbtoa = Buffer.from("".concat(accountSID, ":").concat(authToken)).toString('base64');
  this.authString = "Basic ".concat(authbtoa);
} // eslint-disable-next-line object-curly-newline, camelcase
;

module.exports = SMS;