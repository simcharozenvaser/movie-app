const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const myListController = require("../controllers/myList.controller");

router.get("/", authMiddleware, myListController.getMyList);
router.post("/", authMiddleware, myListController.addMovie);
router.patch("/:movieId", authMiddleware, myListController.updateMovie);
router.delete("/:movieId", authMiddleware, myListController.deleteMovie);

module.exports = router;