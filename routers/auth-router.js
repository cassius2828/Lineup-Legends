const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.js");


router.get("/sign-up", authCtrl.getSignUp);

router.get("/sign-in", authCtrl.getSignIn);

router.get("/sign-out", authCtrl.getSignOut);

router.post("/sign-up", authCtrl.postSignUp);

router.post("/sign-in", authCtrl.postSignIn);

module.exports = router;
