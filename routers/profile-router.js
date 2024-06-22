const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profiles.js");


router.get("/:userId", profileCtrl.getUserProfile);





module.exports = router;
