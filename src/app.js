const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./login/login.router');
const checkToken = require('./login/login.check.token');
const morgan = require('morgan')
const customLogger = require('./helper/customLogger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/', checkToken);
app.use('/login', loginRouter);
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(morgan(function (tokens, req, res) {
  return [
    'Request URL: ',
    req.protocol + '://' + req.get('host') + req.originalUrl,
    'Request params: ',
    JSON.stringify(req.query),
    'Request body: ',
    JSON.stringify(req.body)
  ].join(' ')
}, { stream: customLogger.stream }));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use(
  '/boards/:id/tasks',
  (req, res, next) => {
    req.boardId = req.params.id;
    next();
  },
  taskRouter
);

process.on('uncaughtException', error => {
  customLogger.error(error.stack);
});

process.on('unhandledRejection', error => {
  customLogger.error(error.stack);
});

module.exports = app;
