const request = require('./request');
const response = require('./response');

class Application {
  constructor(server) {
    this.server = server;
    this.middlewares = [];
  }

  static notFound(req, res) {
    res.send('Not Found', 404);
  }

  start(port) {
    this.server.listen(port);
    this.waitForIncomingConnections();
  }

  use(middlewareFn) {
    if (typeof middlewareFn !== 'function') {
      throw new Error('middleware must be a function');
    }
    this.middlewares.push(middlewareFn);
  }

  waitForIncomingConnections() {
    this.server.on('request', (req, res) => {
      this.handleIncomingConnection(req, res);
    });
  }

  async handleIncomingConnection(req, res) {
    let nextCt = 1;
    req = await request(req);
    res = response(res);
    const next = () => {
      if (nextCt < this.middlewares.length) {
        const fn = this.middlewares[nextCt] || function fn() {};
        nextCt += 1;
        fn(req, res, next);
      }
    };
    if (this.middlewares.length > 0) {
      this.middlewares[0](req, res, next);
    }
  }
}

module.exports = Application;
