const express = require("express");
const router = express.Router();
const conversationCtrl = require("../controllers/conversation");
const auth = require("../middleware/auth");

router.get("/profil/", auth, conversationCtrl.getAllConversation);
router.get("/profil/:id", auth, conversationCtrl.getOneConversation);
router.post("/", conversationCtrl.createConversation);
router.delete("/profil/:id", auth, conversationCtrl.deleteConversation);

module.exports = router;
