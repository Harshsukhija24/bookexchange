const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.addBook);
router.put("/:id/status", bookController.updateBookStatus);
router.delete("/:id", bookController.deleteBook);
router.get("/owner/:ownerId", bookController.getBooksByOwner);

module.exports = router;
