var gzippo = require('gzippo');
var express = require('express');

/**
 * app
 */
var app = express();
module.exports = app;

// Emit errors as events to a log
app.on('after', function(req, resp, route, err) {
  if (err) {
    console.error(err);
  }
});

// Enable CORS for development purposes, but not in production
if (process.env.NODE_ENV != 'production') {
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
  });
  console.log('CORS allowed (this option is enabled when node process.env is not \'production\').');
}

// Register handlers to execute when app is closing
process.on('exit', function(){console.log('(exit pid %d)', process.pid)});

// Frontend
app.use('/', express.static(__dirname + '/dist'));

// Start server
app.listen(process.env.PORT || 9000, function(err) {
  console.log('\n===== express.js app (pid %d) =====\n%s\n', process.pid, __dirname);
  if (err) {
    console.error(err);
  }
});
