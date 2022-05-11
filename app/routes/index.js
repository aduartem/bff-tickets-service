const express = require('express');
const authRouter = require('./auth-router');
const ticketRouter = require('./ticket-router');
const userRouter = require('./user-router');
const statusRouter = require('./status-router');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'ok',
  });
});

module.exports = [
  router,
  authRouter,
  ticketRouter,
  userRouter,
  statusRouter,
];
