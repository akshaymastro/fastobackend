const express = require("express");
const ticketController = require("../controllers/ticket");
const router = express.Router();

//Route to get all users
router.post("/createticket", ticketController.CreateTicket);
router.post("/deleteticket", ticketController.DeleteTicket);
router.post("/replyticket", ticketController.ReplyTicket);
router.get("/getticket", ticketController.GetTicket);
router.get("/getticketreplies", ticketController.GetTicketReplies);
router.post("/closeticket", ticketController.CloseTicket);







module.exports = router;