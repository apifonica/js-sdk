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
    var accountSID, authString, from, to, text, options, result, arr, msg, error;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            accountSID = _ref.accountSID, authString = _ref.authString, from = _ref.from, to = _ref.to, text = _ref.text, options = (0, _objectWithoutProperties2["default"])(_ref, ["accountSID", "authString", "from", "to", "text"]);
            _context.prev = 1;
            _context.next = 4;
            return fetchJson("".concat(accountSID, "/messages"), _objectSpread({
              from: from,
              to: to,
              text: text
            }, options), {
              Authorization: authString
            }, 'POST');

          case 4:
            result = _context.sent;

            if (!result.uri) {
              _context.next = 9;
              break;
            }

            arr = result.uri.split('/');
            msg = arr[arr.length - 1];
            return _context.abrupt("return", {
              success: true,
              message_sid: msg
            });

          case 9:
            error = new Error('Could not send message');
            error.error = result;
            throw error;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", _context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 14]]);
  }));
  return _sendSMS.apply(this, arguments);
}

function getSMS(_x2, _x3, _x4) {
  return _getSMS.apply(this, arguments);
}

function _getSMS() {
  _getSMS = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(accountSID, authString, messageSID) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (messageSID) {
              _context2.next = 2;
              break;
            }

            throw new Error('Provide a message SID');

          case 2:
            _context2.prev = 2;
            _context2.next = 5;
            return fetchJson("".concat(accountSID, "/messages/").concat(messageSID), undefined, {
              Authorization: authString
            });

          case 5:
            result = _context2.sent;

            if (result.created) {
              result.created = new Date(result.created);
            }

            return _context2.abrupt("return", result);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", _context2.t0);

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 10]]);
  }));
  return _getSMS.apply(this, arguments);
}

module.exports = {
  sendSMS: sendSMS,
  getSMS: getSMS
};