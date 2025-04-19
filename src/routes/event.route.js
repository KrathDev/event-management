const express = require("express");
const { isAdmin } = require("../middlewares/auth.middleware");
const { createEvent } = require("../controllers/event.controller");
const eventValidation = require("../validations/event.validation");
const router = express.Router();

router.post("/", eventValidation, isAdmin, createEvent);

module.exports = router;
