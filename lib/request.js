const parseurl = require('parseurl');
const querystring = require('querystring');

function defineGetter(obj, name, getter) {
  Object.defineProperty(obj, name, {
    configurable: true,
    enumerable: true,
    get: getter,
  });
}
function request(req) {
  const url = parseurl(req);
  defineGetter(req, 'query', () => querystring.parse(url.query));
  defineGetter(req, 'path', () => url.pathname);

  return req;
}

module.exports = request;
