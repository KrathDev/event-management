const Event = require("../models/Event");

module.exports.createEvent = async (eventData) => {
  const event = new Event(eventData);
  return await event.save();
};

module.exports.findEventById = async (eventId) => {
  return await Event.findById(eventId);
};

module.exports.findAllEvents = async (find) => {
  return await Event.find(find).sort({ createdAt: -1 });
};

module.exports.updateEvent = async (eventId, eventData) => {
  await Event.updateOne({ _id: eventId }, eventData);
};

module.exports.deleteEvent = async (eventId) => {
  await Event.deleteOne({ _id: eventId });
};
