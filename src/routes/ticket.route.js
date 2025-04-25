const express = require("express");
const { isUser, isAdmin } = require("../middlewares/auth.middleware");
const {
  createTicket,
  getTicketsOfUser,
  cancelTicket,
  getTicketsOfEvent,
  cancelTicketByAdmin,
} = require("../controllers/ticket.controller");
const router = express.Router();

router.post("/", isUser, createTicket);
router.get("/user", isUser, getTicketsOfUser);
router.get("/:eventId", isAdmin, getTicketsOfEvent);
router.patch("/:id", isUser, cancelTicket);
router.patch("/admin/:id", isAdmin, cancelTicketByAdmin);

module.exports = router;
