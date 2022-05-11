const _ = require('lodash');

const logger = require('../config/winston');
const apiAuthenticationService = require('../services/api-authentication');

class AuthController {
  constructor() {
    this.className = _.camelCase(this.constructor.name);
  }

  async login(req, res) {
    const method = 'login';
    logger.info(`[${this.className}][${method}] init`);
    try {
      const { username, password } = req.body;
      const token = await apiAuthenticationService.auth(username, password);
      logger.info(`[${this.className}][${method}] success`);
      return res.json(token);
    } catch (e) {
      logger.error(`[${this.className}][${method}] error: %s`, e.message);
      if (e.code === 'ERR_BAD_REQUEST' || e.code === 'ERR_BAD_RESPONSE') {
        return res.status(e.response.status).json(e.response.data);
      }
      return res.status(500).json({
        message: 'Hubo un error al intentar obtener el token.',
      });
    }
  }
}

module.exports = new AuthController();
