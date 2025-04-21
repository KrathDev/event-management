const express = require("express");
const { isUser } = require("../middlewares/auth.middleware");
const {
  createTicket,
  getTicketsOfUser,
  cancelTicket,
} = require("../controllers/ticket.controller");
const router = express.Router();

router.post("/", isUser, createTicket);
router.get("/user", isUser, getTicketsOfUser);
router.patch("/:id", isUser, cancelTicket);

module.exports = router;
