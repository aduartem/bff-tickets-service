const axios = require('axios');
const _ = require('lodash');

const logger = require('../config/winston');
const config = require('../config/config');

class ApiAuthentication {
  constructor() {
    this.className = _.camelCase(this.constructor.name);
    this.baseUrl = config.services.api_authentication;
  }

  async auth(username, password) {
    const method = 'auth';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { data } = await axios.post(`${this.baseUrl}/auth`, {
        username,
        password,
      });
      logger.info(`[${this.className}][${method}] success`);
      return data;
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      throw e;
    }
  }

  async getUsersDev() {
    const method = 'getUsersDev';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { data } = await axios.get(`${this.baseUrl}/role/dev/users`);
      logger.info(`[${this.className}][${method}] success`);
      return data;
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      throw e;
    }
  }
}

module.exports = new ApiAuthentication();
