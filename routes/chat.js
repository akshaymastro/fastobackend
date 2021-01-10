const express = require("express");
const chatController = require("../controllers/chat");
const router = express.Router();

//Route to get all users
router.post("/sendmsg", chatController.SendMsg);

router.post("/replytomsg", chatController.ReplyToMsg);








module.exports = router;