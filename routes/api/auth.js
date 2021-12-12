const express = require("express");

const { upload, validation, ctrlWrapper, authenticate } = require("../../middlewares");
const { joiSchema } = require("../../model/user");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/verify/:verifyToken", ctrlWrapper(ctrl.verify));

router.post("/verify", ctrlWrapper(ctrl.resendEmail));

router.post("/register", validation(joiSchema), ctrlWrapper(ctrl.register));

router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.patch("/avatars", authenticate, upload.single("avatarURL"), ctrlWrapper(ctrl.updateAvatar));

module.exports = router;