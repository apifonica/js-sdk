const fetch = require('node-fetch');

function checkStatus(res) {
  if (res.ok) { // res.status >= 200 && res.status < 300
    return res;
  }
  throw new Error(res);
}

function fetchJson(url, params, headers, method = 'GET') {
  let body;
  let queryUrl = url;
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
      queryUrl = query ? `${url}?${query}` : url;
      break;
  }

  return fetch(queryUrl, {
    method,
    headers: {
      ...headers,
    },
    body,
  })
    .then(checkStatus)
    .then((res) => res.json())
    .catch((e) => e);
}

module.exports = { fetch: fetchJson };
