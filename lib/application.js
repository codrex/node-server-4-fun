const request = require('./request');
const response = require('./response');

class Application {
  constructor(server) {
    this.server = server;
    this.middlewares = [];
  }

  start(port) {
    this.server.listen(port);
    this.waitForIncomingConnections();
  }

  handleIncomingConnection(req, res) {
    let nextCt = 1;
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

  waitForIncomingConnections() {
    this.server.on('request', (req, res) => {
      this.handleIncomingConnection(request(req), response(res));
    });
  }

  use(middlewareFn) {
    if (typeof middlewareFn !== 'function') {
      throw new Error('middleware must be a function');
    }
    this.middlewares.push(middlewareFn);
  }
}

module.exports = Application;
