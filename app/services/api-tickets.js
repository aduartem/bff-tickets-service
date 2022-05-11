const axios = require('axios');
const _ = require('lodash');

const logger = require('../config/winston');
const config = require('../config/config');

class ApiTickets {
  constructor() {
    this.className = _.camelCase(this.constructor.name);
    this.baseUrl = config.services.api_tickets;
  }

  async createTicket(body) {
    const method = 'createTicket';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { data } = await axios.post(`${this.baseUrl}/tickets`, body);
      logger.info(`[${this.className}][${method}] success`);
      return data;
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      throw e;
    }
  }

  async getTickets() {
    const method = 'getTickets';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { data } = await axios.get(`${this.baseUrl}/tickets`);
      logger.info(`[${this.className}][${method}] success`);
      return data;
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      throw e;
    }
  }

  async getTicketById(id) {
    const method = 'getTicketById';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { data } = await axios.get(`${this.baseUrl}/tickets/${id}`);
      logger.info(`[${this.className}][${method}] success`);
      return data;
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      throw e;
    }
  }

  async updateTicketById(ticketId, body) {
    const method = 'updateTicketById';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { data } = await axios.put(`${this.baseUrl}/tickets/${ticketId}`, body);
      logger.info(`[${this.className}][${method}] success`);
      return data;
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      throw e;
    }
  }

  async deleteTicketById(ticketId) {
    const method = 'deleteTicketById';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { data } = await axios.delete(`${this.baseUrl}/tickets/${ticketId}`);
      logger.info(`[${this.className}][${method}] success`);
      return data;
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      throw e;
    }
  }

  async getTicketsByAssignedUser(assignedUser) {
    const method = 'getTicketsByAssignedUser';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { data } = await axios.get(`${this.baseUrl}/user/${assignedUser}/tickets`);
      logger.info(`[${this.className}][${method}] success`);
      return data;
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      throw e;
    }
  }

  async resolveTicket(ticketId, body) {
    const method = 'resolveTicket';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { data } = await axios.put(`${this.baseUrl}/tickets/${ticketId}/resolve`, body);
      logger.info(`[${this.className}][${method}] success`);
      return data;
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      throw e;
    }
  }

  async getStatuses() {
    const method = 'getStatuses';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { data } = await axios.get(`${this.baseUrl}/tickets/statuses`);
      logger.info(`[${this.className}][${method}] success`);
      return data;
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      throw e;
    }
  }

  async getTicketReport() {
    const method = 'getTicketReport';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { data } = await axios.get(`${this.baseUrl}/report/tickets`);
      logger.info(`[${this.className}][${method}] success`);
      return data.data;
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      throw e;
    }
  }
}

module.exports = new ApiTickets();
