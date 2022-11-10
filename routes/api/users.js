const express = require("express");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const router = express.Router();

const ctrl = require('../../controllers/userCntrls');
const authmid = require("../../middlewares/authmid");
const upload = require("../../middlewares/upload");

router.patch(
  "/avatars",
  authmid,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router