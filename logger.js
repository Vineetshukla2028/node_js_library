// const winston = require('winston');

// // Create a basic logger
// const logger = winston.createLogger({
//   level: 'info', // Default logging level
//   transports: [
//     new winston.transports.Console(), // Log to console
//   ],
// });

// // Log messages
// logger.info('This is an info message');
// logger.warn('This is a warning');
// logger.error('This is an error');

const winston = require('winston');

// Create a logger with console and file transports
const winston = require('winston');

// Create a logger with console and file transports
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp to logs
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    }) // Custom log format
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'app.log' }) // Log to file
  ],
});

// Example usage
logger.info('Application started');
logger.warn('Warning! Disk space running low');
logger.error('Failed to connect to the database');

