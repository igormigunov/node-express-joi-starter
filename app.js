/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const celebrate = require('celebrate');
const mongoose = require('mongoose');
const chalk = require('chalk');
const boom = require('express-boom');
const jwt = require('express-jwt');
const logger = require('morgan');

/**
 * Controllers (route handlers).
 */
const userController = require('./controllers/user');
const sessionController = require('./controllers/session');
/**
 * Create Express server.
 */
const app = express();
/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});
/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(boom());

app.use(express.static(path.join(__dirname, 'public', 'swagger'), { maxAge: 31557600000 }));

/* Public routes */
app.get('/', (req, res) => {
  res.render('/public/swagger/index.html');
});
app.post('/api/user',
  celebrate(userController.post.validate),
  userController.post.handler
);
app.post('/api/auth',
  celebrate(sessionController.auth.validate),
  sessionController.auth.handler
);
app.use(jwt({
  secret: process.env.JWT_SECRET,
  getToken: (req) => {
    if (req.headers && req.headers['x-access-token']) {
      return req.headers['x-access-token'];
    }
    return null;
  }
}));
/* Protected routes */
app.get('/api/user/:id',
  celebrate(userController.getById.validate),
  userController.getById.handler
);
app.patch('/api/user/:id',
  celebrate(userController.patch.validate),
  userController.patch.handler
);
app.delete('/api/user/:id',
  celebrate(userController.delete.validate),
  userController.delete.handler
);

/**
 * Error Handler.
 */
app.use(celebrate.errors());
app.use((req, res) => {
  res.boom.notFound(); // Responds with a 404 status code
});

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));

  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
