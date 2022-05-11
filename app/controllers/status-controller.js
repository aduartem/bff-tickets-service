const _ = require('lodash');

const logger = require('../config/winston');
const apiTicketsService = require('../services/api-tickets');

class StatusController {
  constructor() {
    this.className = _.camelCase(this.constructor.name);
  }

  async getStatuses(req, res) {
    const method = 'getStatuses';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const statuses = await apiTicketsService.getStatuses();
      logger.info(`[${this.className}][${method}] success`);
      return res.json(statuses);
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.sendStatus(500);
    }
  }
}

module.exports = new StatusController();
