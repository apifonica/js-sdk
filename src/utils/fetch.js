import { v4 as uuid } from 'uuid';
import fetch from 'node-fetch';
import { version } from '../../package.json';

function checkStatus(res) {
  if (res.ok) { // res.status >= 200 && res.status < 300
    return res;
  }
  if (res.status === 401 || res.status === 403) {
    throw new Error({
      status: res.status,
      message: 'Unauthorized',
      error: res,
    });
  }
  if (res.status >= 400 && res.status < 500) {
    throw new Error({
      status: res.status,
      message: 'Bad Request',
      error: res,
    });
  }
  if (res.status >= 500) {
    throw new Error({
      status: res.status,
      message: 'Server Error',
      error: res,
    });
  }
  throw new Error({
    status: res.status,
    message: 'Error',
    error: res,
  });
}

function fetchJson(url, params, headers, method = 'GET') {
  let body;
  const initialUrl = `https://api.apifonica.com/v2/accounts/${url}`;
  let queryUrl = initialUrl;
  switch (method) {
    case 'POST':
    case 'PUT':
    case 'DELETE':
    case 'HEAD':
      body = JSON.stringify({
        ...params,
      });
      break;
    default:
    // GET
      // eslint-disable-next-line no-case-declarations
      const query = params && Object.keys(params).length > 0
        ? Object.keys(params)
          .map((key) => `${key}=${params[key]}`).join('&')
        : '';
      queryUrl = query ? `${initialUrl}?${query}` : initialUrl;
      break;
  }

  return fetch(queryUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-SDK-Version': version,
      'X-Request-ID': uuid(),
      ...headers,
    },
    body,
  })
    .then(checkStatus)
    .then((res) => res.json())
    .catch((e) => e);
}

module.exports = { fetchJson };
