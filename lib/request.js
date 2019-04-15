const url = require('url');
const qs = require('querystring');
const { StringDecoder } = require('string_decoder');

// function defineGetter(obj, name, getter) {
//   Object.defineProperty(obj, name, {
//     configurable: true,
//     enumerable: true,
//     get: getter,
//   });
// }

function parseData(type, data = '') {
  switch (type) {
    case 'application/json':
      return JSON.parse(data);
    case 'application/x-www-form-urlencoded':
      return qs.parse(data);
    default:
      return {};
  }
}

async function request(req) {
  const { query, pathname } = url.parse(req.url, true);
  const stringDecoder = new StringDecoder('utf-8');
  let buffer = '';

  req.on('data', (data) => {
    buffer += stringDecoder.write(data);
  });

  req.on('end', () => {
    buffer += stringDecoder.end();

    const type = req.headers['content-type'];
    try {
      req.body = parseData(type, buffer);
    } catch (error) {
      req.body = {};
    }
  });

  req.on('error', (err) => {
    // console.log(err);
  });

  req.query = query;
  req.pathname = pathname;

  return req;
}

module.exports = request;
