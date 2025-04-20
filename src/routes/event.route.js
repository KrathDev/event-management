const express = require("express");
const { isAdmin } = require("../middlewares/auth.middleware");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");
const eventValidation = require("../validations/event.validation");
const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", eventValidation, isAdmin, createEvent);
router.put("/:id", isAdmin, updateEvent);
router.delete("/:id", isAdmin, deleteEvent);

module.exports = router;
