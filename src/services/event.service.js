const Event = require("../models/Event");

module.exports.createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

module.exports.findEventById = async (eventId) => {
  return await Event.findById(eventId);
};

module.exports.getAllEvents = async () => {
  return await Event.find({}).sort({ createdAt: -1 });
};
