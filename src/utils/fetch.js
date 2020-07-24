import { v4 as uuid } from 'uuid';
import fetch from 'node-fetch';
import { version } from '../../package.json';

async function checkStatus(res) {
  if (res.ok) { // res.status >= 200 && res.status < 300
    return res;
  }
  let error;
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
  const json = await res.json();
  error.error = json;
  throw error;
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
