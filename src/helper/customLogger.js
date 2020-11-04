const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ timestamp, message }) => {
  return timestamp + ': ' + message;
});

const customLogger = createLogger({
  format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console({
      handleExceptions: true
    }),
    new transports.File({
      filename: 'combined.log',
      handleExceptions: true
    })
  ],
  exceptionHandlers: [
    new transports.File({
      filename: 'exceptions.log',
      handleExceptions: true
    })
  ],
  handleExceptions: true,
  exitOnError: false
});

customLogger.stream = {
  write: message => customLogger.info(message)
};

module.exports = customLogger;