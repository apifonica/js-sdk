"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fetch = require('node-fetch');

function checkStatus(res) {
  if (res.ok) {
    // res.status >= 200 && res.status < 300
    return res;
  }

  throw new Error(res);
}

function fetchJson(url, params, headers) {
  var method = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'GET';
  var body;
  var queryUrl = url;

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
      queryUrl = query ? "".concat(url, "?").concat(query) : url;
      break;
  }

  return fetch(queryUrl, {
    method: method,
    headers: _objectSpread({}, headers),
    body: body
  }).then(checkStatus).then(function (res) {
    return res.json();
  })["catch"](function (e) {
    return e;
  });
}

module.exports = {
  fetch: fetchJson
};