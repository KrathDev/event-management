const User = require("../models/User");
const eventService = require("../services/event.service");
const ticketService = require("../services/ticket.service");
const userService = require("../services/user.service");
const mongoose = require("mongoose");
const searchEvent = require("../utils/searchEvent");

// [POST] /api/v1/events
const createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body, createdBy: req.user.userId };

    const event = await eventService.createEvent(eventData);

    return res.status(201).json({ message: "Tạo sự kiện thành công", event });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [GET] /api/v1/events
const getAllEvents = async (req, res) => {
  try {
    const filter = searchEvent(req.query);
    const events = await eventService.findAllEvents(filter);

    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [GET] /api/v1/events/:id
const getEventById = async (req, res) => {
  try {
    const eventId = req.params.id;
    console.log(eventId);
    const event = await eventService.findEventById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Sự kiện không tồn tại" });
    }

    res.status(200).json(event);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// [PATCH] /api/v1/events/:id
const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const eventData = req.body;

    const event = await eventService.findEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Sự kiện không tồn tại" });
    }

    await eventService.updateEvent(eventId, eventData);
    return res
      .status(200)
      .json({ message: "Cập nhật sự kiện thành công", eventData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [DELETE] /api/v1/events/:id
const deleteEvent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const eventId = req.params.id;

    const event = await eventService.findEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Sự kiện không tồn tại" });
    }

    const tickets = await ticketService.getTicketsOfEvent(eventId);
    for (const ticket of tickets) {
      ticket.status = "cancelled";
      await ticket.save({ session });

      const user = await userService.findUserById(ticket.user);
      if (user) {
        await User.updateOne(
          { _id: ticket.user },
          { $pull: { bookedTickets: ticket._id } }, // Xóa những vé có id là ticket._id khỏi bookedTickets của user
          { session }
        );
      }
    }

    await eventService.deleteEvent(eventId, session);

    await session.commitTransaction();
    return res.status(200).json({ message: "Xóa sự kiện thành công" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
