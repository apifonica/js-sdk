"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _require = require('../utils/fetch'),
    fetchJson = _require.fetchJson; // eslint-disable-next-line no-unused-vars, object-curly-newline


function sendSMS(_x) {
  return _sendSMS.apply(this, arguments);
}

function _sendSMS() {
  _sendSMS = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var accountSID, authString, from, to, text, options, result, arr, msg;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            accountSID = _ref.accountSID, authString = _ref.authString, from = _ref.from, to = _ref.to, text = _ref.text, options = (0, _objectWithoutProperties2["default"])(_ref, ["accountSID", "authString", "from", "to", "text"]);

            if (!(!from || !to || !text)) {
              _context.next = 3;
              break;
            }

            throw new Error('Required parameters not present. Please provide at least the "from", "to", and "text" parameters');

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return fetchJson("".concat(accountSID, "/messages"), _objectSpread({
              from: from,
              to: to,
              text: text
            }, options), {
              Authorization: authString
            }, 'POST');

          case 6:
            result = _context.sent;

            if (!result.uri) {
              _context.next = 11;
              break;
            }

            arr = result.uri.split('/');
            msg = arr[arr.length - 1];
            return _context.abrupt("return", {
              success: true,
              message_sid: msg
            });

          case 11:
            throw new Error({
              messageText: 'Could not send SMS',
              result: result
            });

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", _context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 14]]);
  }));
  return _sendSMS.apply(this, arguments);
}

function getSMS(_x2) {
  return _getSMS.apply(this, arguments);
}

function _getSMS() {
  _getSMS = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
    var authString, accountSID, messageSID, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            authString = _ref2.authString, accountSID = _ref2.accountSID, messageSID = _ref2.messageSID;

            if (messageSID) {
              _context2.next = 3;
              break;
            }

            throw new Error('Provide a message SID');

          case 3:
            _context2.prev = 3;
            _context2.next = 6;
            return fetchJson("".concat(accountSID, "/messages/").concat(messageSID), undefined, {
              Authorization: authString
            });

          case 6:
            result = _context2.sent;

            if (result.created) {
              result.created = new Date(result.created);
            }

            return _context2.abrupt("return", result);

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](3);
            return _context2.abrupt("return", _context2.t0);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 11]]);
  }));
  return _getSMS.apply(this, arguments);
}

module.exports = {
  sendSMS: sendSMS,
  getSMS: getSMS
};