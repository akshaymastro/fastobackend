const express = require("express");
const ticketReplyController = require("../controllers/ticketReply");
const router = express.Router();

//Route to get all users
router.post("/ticketreply", ticketReplyController.TicketReply);




module.exports = router;