const _ = require('lodash');

const logger = require('../config/winston');
const apiTicketsService = require('../services/api-tickets');
const apiAuthenticationService = require('../services/api-authentication');

const mapTicketReport = (data, users) => {
  const result = data.map((obj) => {
    const user = users.find((c) => c.username === obj.assigned_user);
    const totalTickets = (
      obj.total_to_solve + obj.total_resolved + obj.total_rejected + obj.total_canceled
    );
    const map = {
      dev: {
        fullname: `${user.first_name} ${user.last_name}`,
        username: obj.assigned_user,
        ticketReport: {
          totalToSolve: obj.total_to_solve,
          totalResolved: obj.total_resolved,
          totalRejected: obj.total_rejected,
          totalCanceled: obj.total_canceled,
          totalTickets,
        },
      },
    };
    return map;
  });
  return result;
};

class TicketController {
  constructor() {
    this.className = _.camelCase(this.constructor.name);
  }

  async createTicket(req, res) {
    const method = 'createTicket';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const tickets = await apiTicketsService.createTicket(req.body);
      logger.info(`[${this.className}][${method}] success`);
      return res.json(tickets);
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      if (e.code === 'ERR_BAD_REQUEST' || e.code === 'ERR_BAD_RESPONSE') {
        return res.status(e.response.status).json(e.response.data);
      }
      return res.status(500).json({
        message: 'Hubo un error al intentar crear un ticket.',
      });
    }
  }

  async getTickets(req, res) {
    const method = 'getTickets';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const tickets = await apiTicketsService.getTickets();
      logger.info(`[${this.className}][${method}] success`);
      return res.json(tickets);
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.sendStatus(500);
    }
  }

  async getTicketById(req, res) {
    const method = 'getTicketById';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { id } = req.params;
      const tickets = await apiTicketsService.getTicketById(id);
      logger.info(`[${this.className}][${method}] success`);
      return res.json(tickets);
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.sendStatus(500);
    }
  }

  async updateTicketById(req, res) {
    const method = 'updateTicketById';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { id } = req.params;
      const tickets = await apiTicketsService.updateTicketById(id, req.body);
      logger.info(`[${this.className}][${method}] success`);
      return res.json(tickets);
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      if (e.code === 'ERR_BAD_REQUEST' || e.code === 'ERR_BAD_RESPONSE') {
        return res.status(e.response.status).json(e.response.data);
      }
      return res.status(500).json({
        message: 'Hubo un error al intentar actualizar el ticket.',
      });
    }
  }

  async deleteTicketById(req, res) {
    const method = 'deleteTicketById';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { id } = req.params;
      const tickets = await apiTicketsService.deleteTicketById(id);
      logger.info(`[${this.className}][${method}] success`);
      return res.json(tickets);
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      if (e.code === 'ERR_BAD_REQUEST' || e.code === 'ERR_BAD_RESPONSE') {
        return res.status(e.response.status).json(e.response.data);
      }
      return res.status(500).json({
        message: 'Hubo un error al intentar eliminar el ticket.',
      });
    }
  }

  async getTicketsByAssignedUser(req, res) {
    const method = 'getTicketsByAssignedUser';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { username: assignedUser } = req.params;
      const tickets = await apiTicketsService.getTicketsByAssignedUser(assignedUser);
      logger.info(`[${this.className}][${method}] success`);
      return res.json(tickets);
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.sendStatus(500);
    }
  }

  async resolveTicket(req, res) {
    const method = 'resolveTicket';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { id } = req.params;
      logger.info(`[${this.className}][${method}] Ticket ID: ${id}`);
      logger.info(`[${this.className}][${method}] req.body: ${JSON.stringify(req.body)}`);
      const tickets = await apiTicketsService.resolveTicket(id, req.body);
      logger.info(`[${this.className}][${method}] success`);
      return res.json(tickets);
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      if (e.code === 'ERR_BAD_REQUEST' || e.code === 'ERR_BAD_RESPONSE') {
        return res.status(e.response.status).json(e.response.data);
      }
      return res.status(500).json({
        message: 'Hubo un error al intentar resolver un ticket.',
      });
    }
  }

  async getTicketReport(req, res) {
    const method = 'getTicketReport';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const data = await apiTicketsService.getTicketReport();
      const devs = await apiAuthenticationService.getUsersDev();
      const result = mapTicketReport(data, devs.users);
      logger.info(`[${this.className}][${method}] success`);
      return res.json({
        data: result,
      });
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      return res.sendStatus(500);
    }
  }
}

module.exports = new TicketController();
