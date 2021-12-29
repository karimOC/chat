const express = require("express");
const router = express.Router();
const messageCtrl = require("../controllers/message");
const auth = require("../middleware/auth");

router.get("/:id/messages", auth, messageCtrl.getAllMessages);
router.post("/:id/message/", auth, messageCtrl.createMessage);
router.delete("/:idConversation/message/:id", auth, messageCtrl.deleteMessage);

module.exports = router;
