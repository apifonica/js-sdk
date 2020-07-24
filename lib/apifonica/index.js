"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var SMS = require('../Message/sms.js');

var TelegramMessage = require('../Message/telegram.js');

var FacebookMessage = require('../Message/facebook.js');

var Apifonica = function Apifonica(_accountSID, _authToken) {
  var _this = this;

  (0, _classCallCheck2["default"])(this, Apifonica);
  (0, _defineProperty2["default"])(this, "authToken", null);
  (0, _defineProperty2["default"])(this, "accountSID", null);
  (0, _defineProperty2["default"])(this, "authString", null);
  (0, _defineProperty2["default"])(this, "makeAuthString", function (accountSID, authToken) {
    var authbtoa = Buffer.from("".concat(accountSID, ":").concat(authToken)).toString('base64');
    _this.authString = "Basic ".concat(authbtoa);
  });
  (0, _defineProperty2["default"])(this, "newSMS", function (from, to, text) {
    var message = new SMS(_this.accountSID, _this.authString, from, to, text);
    return message;
  });
  (0, _defineProperty2["default"])(this, "newTelegramMessage", function (from, to, text) {
    var message = new TelegramMessage(_this.accountSID, _this.authString, from, to, text);
    return message;
  });
  (0, _defineProperty2["default"])(this, "newFacebookMessage", function (from, to, text) {
    var message = new FacebookMessage(_this.accountSID, _this.authString, from, to, text);
    return message;
  });

  if (!_accountSID || !_authToken) {
    throw new Error('Please provide your account information');
  }

  this.accountSID = _accountSID;
  this.authToken = _authToken;
  this.makeAuthString(_accountSID, _authToken);
};

module.exports = Apifonica;