'use strict';

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) return val //named pipe;
  if (port >= 0) return port //port number;

  return false;
}

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require('cors');
const port  = normalizePort(process.env.PORT || 3000);
const debug = require('debug')('nodeapp:server');
const http  = require('http');

const app = express();
const server = http.createServer(app);

class App {
  constructor() {
    this.config();
    this.initRoutes();
    this.initErrors();
    this.start();
  }
  
  /**
   * Start Server Set Up Process
   */
  config() {

    /**
     * view engine setup
     */
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(cors());
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
  }

  initRoutes() {
    const index = require('./routes/index')(app);
  }

  initErrors() {
    
    /**
     * Catch 404 and forward to error handler
     */
    app.use(function(req, res, next) {
      const err = new Error('Not Found');
      err.status = 404;
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');

      next(err);
    });

    /**
     * Error handler
     */
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(200).json({
				'status': false, 
				'error': 'An expected error ocurred.'
			});
    });
  }

  /**
   * Event listener for HTTP server "error" event.
   */
  onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */
  onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }

  /**
   * Listen on provided port, on all network interfaces.
   */
   start() {
    process.env.ENV = 'development';
    server.listen(port);
    server.on('error', this.onError);
    server.on('listening', this.onListening);
  }
}

module.exports = new App();
