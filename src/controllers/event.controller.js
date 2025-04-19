const eventService = require("../services/event.service");

const createEvent = async (req, res) => {
  try {
    const eventData = { ...req.body, createdBy: req.user.userId };

    const event = await eventService.createEvent(eventData);

    if (!event) {
      return res.status(400).json({ message: "Tạo sự kiện thất bại" });
    }
    return res.status(201).json({ message: "Tạo sự kiện thành công", event });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await eventService.getAllEvents();

    if (!events) {
      return res.status(404).json({ message: "Không tìm thấy sự kiện nào" });
    }

    return res
      .status(200)
      .json({ message: "Lấy danh sách sự kiện thành công", events });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
};
