const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use('/node_modules', express.static('node_modules'));
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/server/views');
app.use(bodyParser.json());

require('./routes')(app);

app.use(function (err, req, res, next) {
  log.error(err.stack);
  res.status(500).send(err);
});

module.exports = app;