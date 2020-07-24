"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _api = require("../api");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Message = function Message(accountSID, authString, from, to, text) {
  var _this = this;

  (0, _classCallCheck2["default"])(this, Message);
  (0, _defineProperty2["default"])(this, "from", null);
  (0, _defineProperty2["default"])(this, "to", null);
  (0, _defineProperty2["default"])(this, "text", null);
  (0, _defineProperty2["default"])(this, "accountSID", null);
  (0, _defineProperty2["default"])(this, "authString", null);
  (0, _defineProperty2["default"])(this, "messageSID", null);
  (0, _defineProperty2["default"])(this, "messageAppSID", null);
  (0, _defineProperty2["default"])(this, "channel", null);
  (0, _defineProperty2["default"])(this, "url", null);
  (0, _defineProperty2["default"])(this, "tag", null);
  (0, _defineProperty2["default"])(this, "send", /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var options, sentSMS, error;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // take only non-null optional params
            options = Object.entries({
              msg_app_sid: _this.messageAppSID,
              channel: _this.channel,
              type: _this.type,
              url: _this.url,
              tag: _this.tag
            }).reduce(function (acc, _ref2) {
              var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
                  key = _ref3[0],
                  value = _ref3[1];

              return value === null ? acc : _objectSpread(_objectSpread({}, acc), {}, (0, _defineProperty2["default"])({}, key, value));
            }, {});
            _context.next = 3;
            return (0, _api.sendSMS)(_objectSpread({
              accountSID: _this.accountSID,
              authString: _this.authString,
              from: _this.from,
              to: _this.to,
              text: _this.text
            }, options));

          case 3:
            sentSMS = _context.sent;

            if (!sentSMS.success) {
              _context.next = 7;
              break;
            }

            _this.messageSID = sentSMS.message_sid;
            return _context.abrupt("return", sentSMS);

          case 7:
            error = new Error('Could not send message');
            error.error = sentSMS;
            throw error;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  (0, _defineProperty2["default"])(this, "checkStatus", function () {
    if (!_this.messageSID) {
      throw new Error('Message has not been sent');
    }

    return (0, _api.getSMS)(_this.accountSID, _this.authString, _this.messageSID);
  });
  (0, _defineProperty2["default"])(this, "setMessageAppSID", function (messageAppSID) {
    _this.messageAppSID = messageAppSID;
    return _this;
  });
  (0, _defineProperty2["default"])(this, "setType", function (type) {
    _this.type = type;
    return _this;
  });
  (0, _defineProperty2["default"])(this, "setMediaURL", function (url) {
    _this.url = url;
    return _this;
  });
  (0, _defineProperty2["default"])(this, "setTag", function (tag) {
    _this.tag = tag;
    return _this;
  });

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
};

module.exports = Message;