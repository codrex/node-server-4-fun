const defaultStatusCode = 200;
const textPlain = 'text/plain';
const textHtml = 'text/html';
const textJson = 'text/json';

function Response(res) {
  function __send(data = '', type) {
    res.setHeader('Content-Type', type);
    res.write(data);
    res.end();
  }

  res.send = function send(data, statusCode = defaultStatusCode, isPlain = false) {
    this.statusCode = statusCode;
    switch (typeof data) {
      case 'string': {
        const type = isPlain ? textPlain : textHtml;
        __send(data, type);
        break;
      }

      case 'object':
        __send(JSON.stringify(data), textJson);
        break;
      default:
        throw new Error('Invalid type: expect data to be of type string or object');
    }
  };
  return res;
}

module.exports = Response;
