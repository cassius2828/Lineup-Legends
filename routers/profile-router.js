const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profiles.js");

router.put("/:userId/bio", profileCtrl.updateBio);
router.put("/:userId/username", profileCtrl.updateUsername);
router.get("/:userId", profileCtrl.getUserProfile);






module.exports = router;
