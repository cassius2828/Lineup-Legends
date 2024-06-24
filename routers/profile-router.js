const express = require("express");
const router = express.Router();
const profileCtrl = require("../controllers/profiles.js");
// router.get("/add", profileCtrl.addNewFieldsToUsers);
router.put("/:userId/bio", profileCtrl.updateBio);
router.put("/:userId/username", profileCtrl.updateUsername);
router.put("/:userId/password", profileCtrl.updatePassowrd);

router.put("/:userId/send-confirm-email", profileCtrl.updateEmailStepOne);
router.get("/confirm-email", profileCtrl.updateEmailStepTwo);

router.get("/:userId/edit", profileCtrl.getEditUserProfile);
router.get("/:userId/card-collection", profileCtrl.getUserProfileCardCollection);
router.get("/:userId/social-media", profileCtrl.getUserProfileSocialMedia);
router.get("/:userId", profileCtrl.getUserProfile);

module.exports = router;

