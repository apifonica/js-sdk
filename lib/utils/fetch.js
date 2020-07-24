"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _uuid = require("uuid");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _package = require("../../package.json");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function checkStatus(_x) {
  return _checkStatus.apply(this, arguments);
}

function _checkStatus() {
  _checkStatus = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(res) {
    var error, json;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!res.ok) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res);

          case 2:
            if (res.status === 401 || res.status === 403) {
              error = new Error('Unauthorized');
            } else if (res.status >= 400 && res.status < 500) {
              error = new Error('Bad request');
            } else if (res.status >= 500) {
              error = new Error('Server error');
            } else {
              error = new Error('Error');
            }

            error.status = res.status;
            _context.next = 6;
            return res.json();

          case 6:
            json = _context.sent;
            error.error = json;
            throw error;

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _checkStatus.apply(this, arguments);
}

function fetchJson(url, params, headers) {
  var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'GET';
  var body;
  var initialUrl = "https://api.apifonica.com/v2/accounts/".concat(url);
  var queryUrl = initialUrl;

  switch (method) {
    case 'POST':
    case 'PUT':
    case 'DELETE':
    case 'HEAD':
      body = JSON.stringify(_objectSpread({}, params));
      break;

    default:
      // GET
      // eslint-disable-next-line no-case-declarations
      var query = params && Object.keys(params).length > 0 ? Object.keys(params).map(function (key) {
        return "".concat(key, "=").concat(params[key]);
      }).join('&') : '';
      queryUrl = query ? "".concat(initialUrl, "?").concat(query) : initialUrl;
      break;
  }

  return (0, _nodeFetch["default"])(queryUrl, {
    method: method,
    headers: _objectSpread({
      'Content-Type': 'application/json',
      'X-SDK-Version': _package.version,
      'X-Request-ID': (0, _uuid.v4)()
    }, headers),
    body: body
  }).then(checkStatus).then(function (res) {
    return res.json();
  })["catch"](function (e) {
    return e;
  });
}

module.exports = {
  fetchJson: fetchJson
};