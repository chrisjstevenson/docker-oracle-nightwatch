var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use('/app', express.static('app'));
app.use('/node_modules', express.static('node_modules'));

app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/server/views');
app.use(bodyParser.json());

require('./routes')(app);

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err);
})

module.exports = app;