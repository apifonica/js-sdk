"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _uuid = require("uuid");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _package = require("../../package.json");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function checkStatus(res) {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return res;
  }

  if (res.status === 401 || res.status === 403) {
    throw new Error({
      status: res.status,
      message: 'Unauthorized',
      error: res
    });
  }

  if (res.status >= 400 && res.status < 500) {
    throw new Error({
      status: res.status,
      message: 'Bad Request',
      error: res
    });
  }

  if (res.status >= 500) {
    throw new Error({
      status: res.status,
      message: 'Server Error',
      error: res
    });
  }

  throw new Error({
    status: res.status,
    message: 'Error',
    error: res
  });
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