const express = require("express");
const { isUser } = require("../middlewares/auth.middleware");
const { createTicket } = require("../controllers/ticket.controller");
const router = express.Router();

router.post("/", isUser, createTicket);

module.exports = router;
