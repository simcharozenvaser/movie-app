const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const authController = require("../controllers/auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", authMiddleware, authController.me);
module.exports = router;