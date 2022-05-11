const _ = require('lodash');

const logger = require('../config/winston');
const apiAuthenticationService = require('../services/api-authentication');

class UserController {
  constructor() {
    this.className = _.camelCase(this.constructor.name);
  }

  async getUsersDev(req, res) {
    const method = 'getUsersDev';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const users = await apiAuthenticationService.getUsersDev();
      logger.info(`[${this.className}][${method}] success`);
      return res.json(users);
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.sendStatus(500);
    }
  }
}

module.exports = new UserController();
