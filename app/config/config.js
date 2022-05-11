require('dotenv').config();

const logger = require('./winston');

const config = {
  dev: {
    app: {
      name: process.env.APP_NAME || 'api-tickets-service',
      port: process.env.PORT || '3000',
      jwt: {
        secret: process.env.SECRET || 'secret',
      },
    },
    services: {
      api_authentication: process.env.API_AUTHENTICATION || 'http://localhost:3001/api/v1',
      api_tickets: process.env.API_TICKETS || 'http://localhost:3002/api/v1',
    },
  },
  qa: {
    app: {
      name: process.env.APP_NAME,
      port: process.env.PORT,
      jwt: {
        secret: process.env.SECRET,
      },
    },
    services: {
      api_authentication: process.env.API_AUTHENTICATION || '',
      api_tickets: process.env.API_TICKETS || '',
    },
  },
  production: {
    app: {
      name: process.env.APP_NAME,
      port: process.env.PORT,
      jwt: {
        secret: process.env.SECRET,
      },
    },
    services: {
      api_authentication: process.env.API_AUTHENTICATION || '',
      api_tickets: process.env.API_TICKETS || '',
    },
  },
};
logger.info('process.env.NODE_ENV: %s', process.env.NODE_ENV);
module.exports = config[process.env.NODE_ENV];
