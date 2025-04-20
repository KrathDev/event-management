const Ticket = require("../models/Ticket");

module.exports.createTicket = async (ticketData) => {
  const ticket = new Ticket(ticketData);
  return await ticket.save();
};
