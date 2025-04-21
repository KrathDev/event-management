const express = require("express");
const { isAdmin } = require("../middlewares/auth.middleware");
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");
const {
  eventValidation,
  eventUpdateValidation,
} = require("../validations/event.validation");
const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", eventValidation, isAdmin, createEvent);
router.patch("/:id", isAdmin, eventUpdateValidation, updateEvent);
router.delete("/:id", isAdmin, deleteEvent);

module.exports = router;
