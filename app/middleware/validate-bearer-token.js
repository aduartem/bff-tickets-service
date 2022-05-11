const jwt = require('jsonwebtoken');
const moment = require('moment');

const logger = require('../config/winston');
const { secret } = require('../config/config').app.jwt;

const whitelist = [
  '/api/v1/bff/auth',
];

exports.validateBearerToken = async (req, res, next) => {
  const method = 'validateBearerToken';
  logger.info(`[middleware][${method}] init`);

  const whitelistResult = whitelist.find((route) => route === req.path);
  if (whitelistResult) {
    return next();
  }
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: 'Falta bearer token',
    });
  }
  const tokenParse = authorization.replace('Bearer ', '');
  let decoded = null;
  try {
    decoded = jwt.verify(tokenParse, secret);
  } catch (error) {
    logger.error(`[middleware][${method}] error not authorized`);
    return res.sendStatus(401);
  }

  if (decoded.exp <= moment().unix()) {
    logger.error(`[middleware][${method}] error not authorized`);
    return res.sendStatus(401);
  }
  logger.info(`[middleware][${method}] success`);
  return next();
};
