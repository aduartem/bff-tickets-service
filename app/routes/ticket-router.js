const router = require('express').Router();

const ticketController = require('../controllers/ticket-controller');

router.post('/tickets', ticketController.createTicket.bind(ticketController));

router.get('/tickets', ticketController.getTickets.bind(ticketController));
router.get('/tickets/:id', ticketController.getTicketById.bind(ticketController));

router.put('/tickets/:id', ticketController.updateTicketById.bind(ticketController));

router.delete('/tickets/:id', ticketController.deleteTicketById.bind(ticketController));

router.get('/user/:username/tickets', ticketController.getTicketsByAssignedUser.bind(ticketController));
router.put('/tickets/:id/resolve', ticketController.resolveTicket.bind(ticketController));

router.get('/report/tickets', ticketController.getTicketReport.bind(ticketController));

module.exports = router;
