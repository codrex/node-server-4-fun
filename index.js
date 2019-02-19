const http = require('http');
const bodyParser = require('body-parser');

const Application = require('./lib/application');

const port = parseInt(process.env.PORT, 10) || 8000;
const app = new Application(http.createServer());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res) => {
  res.send(req.body);
});

app.start(port);
