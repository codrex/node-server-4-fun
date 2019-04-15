const http = require('http');
const router = require('router')();

const Application = require('./lib/application');

const port = parseInt(process.env.PORT, 10) || 8000;
const app = new Application(http.createServer());
app.use((req, res, next) => {
  console.log('middleware');
  if (typeof next === 'function') {
    next();
  }
});

app.use((req, res, next) => {
  console.log('middleware2');
  if (typeof next === 'function') {
    next();
  }
});

app.use((req, res, next) => {
  console.log('middleware3');
  if (typeof next === 'function') {
    next();
  }
});

app.use(
  router.get('/home/:id/:someotherid', (req, res, next) => {
    console.log(req.params);
    res.send({ msg: 'hello server 4 fun' });
    next();
  }),
);

app.use((req, res, next) => {
  console.log('middleware3');
  if (typeof next === 'function') {
    next();
  }
});

app.start(port);
