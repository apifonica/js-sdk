"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _require = require('../api/index.js'),
    sendSMS = _require.sendSMS,
    getSMS = _require.getSMS;

var SMS = function SMS(_ref) {
  var _this = this;

  var accountSID = _ref.accountSID,
      authToken = _ref.authToken;
  (0, _classCallCheck2["default"])(this, SMS);
  (0, _defineProperty2["default"])(this, "authString", null);
  (0, _defineProperty2["default"])(this, "accountSID", null);
  (0, _defineProperty2["default"])(this, "sendSMS", function (_ref2) {
    var from = _ref2.from,
        to = _ref2.to,
        text = _ref2.text,
        options = (0, _objectWithoutProperties2["default"])(_ref2, ["from", "to", "text"]);

    if (!_this.authString) {
      throw new Error('Please provide your account information first');
    }

    return sendSMS(_objectSpread({
      accountSID: _this.accountSID,
      authString: _this.authString,
      from: from,
      to: to,
      text: text
    }, options));
  });
  (0, _defineProperty2["default"])(this, "getSMS", function (messageSID) {
    if (!_this.authString) {
      throw new Error('Please provide your account information first');
    }

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
};

module.exports = SMS;