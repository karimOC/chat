const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profile");
const auth = require("../middleware/auth");

router.get("/profile/:id", auth, profileCtrl.getOneProfile);
router.get("/profile/:id/messages", auth, profileCtrl.getAllMessagesProfile);
router.put("/profile/:id", auth, profileCtrl.modifyProfile);
router.delete("/profile/:id", auth, profileCtrl.deleteProfile);

module.exports = router;
