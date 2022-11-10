const express = require("express");
const router = express.Router();

const ctrl = require("../../controllers/authCntrls");
const authmid = require("../../middlewares/authmid");
const validation = require('../../middlewares/validation');
const {schemas} = require("../../schemas/schemas");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

router.post("/signup",
    validation(schemas.registerSchema),
    ctrlWrapper(ctrl.signup));

router.post("/login", validation(schemas.loginSchema),
    ctrlWrapper(ctrl.login));

router.get("/logout", authmid,
    ctrlWrapper(ctrl.logout));

module.exports = router;