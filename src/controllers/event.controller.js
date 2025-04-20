const eventService = require("../services/event.service");

// [POST] /api/events
const createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body, createdBy: req.user.userId };

    const event = await eventService.createEvent(eventData);

    return res.status(201).json({ message: "Tạo sự kiện thành công", event });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [GET] /api/events
const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.findAllEvents({});

    return res.status(200).json(events);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// [GET] /api/events/:id
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

// [PUT] /api/events/:id
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

// [DELETE] /api/events/:id
const deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    const event = await eventService.findEventById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Sự kiện không tồn tại" });
    }

    await eventService.deleteEvent(eventId);
    return res.status(200).json({ message: "Xóa sự kiện thành công" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
