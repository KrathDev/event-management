const Ticket = require("../models/Ticket");

module.exports.createTicket = async (ticketData, session) => {
  const ticket = new Ticket(ticketData);
  return await ticket.save({ session });
};

module.exports.getTicketsOfUser = async (find) => {
  return await Ticket.find(find).populate(
    "event",
    "title description date location category price"
  );
};

module.exports.getTicketsOfEvent = async (eventId) => {
  return await Ticket.find({ event: eventId })
    .populate("user", "username email")
    .populate("event", "title description date location category price");
};

module.exports.findTicketById = async (ticketId) => {
  return await Ticket.findById(ticketId);
};
