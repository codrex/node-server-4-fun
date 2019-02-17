const defaultStatusCode = 200;
const textPlain = 'text/plain';
const textHtml = 'text/html';
const textJson = 'text/json';

class Response {
  constructor(res) {
    this.res = res;
    this._send = this._send.bind(res);
    this.send = this.send.bind(res);
  }

  _send(data = '', type) {
    this.setHeader('Content-Type', type);
    this.write(data);
    this.end();
  }

  send(data, statusCode = defaultStatusCode, isPlain = false) {
    this.statusCode = statusCode;
    switch (typeof data) {
      case 'string': {
        const type = isPlain ? textPlain : textHtml;
        this._send(data, type);
        break;
      }

      case 'object':
        this._send(JSON.stringify(data), textJson);
        break;
      default:
        throw new Error('Invalid type: expect data to be of type string or object');
    }
  }
}

export default Response;
