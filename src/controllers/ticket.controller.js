const ticketService = require("../services/ticket.service");
const eventService = require("../services/event.service");
const { findUserById } = require("../services/user.service");

const createTicket = async (req, res) => {
  try {
    const eventId = req.body.eventId;
    const ticketData = { eventId, userId: req.user.userId };
    const ticket = await ticketService.createTicket(ticketData);

    const event = await eventService.findEventById(eventId);
    event.ticketsAvailable -= 1;
    await event.save();

    const user = await findUserById(req.user.userId);
    user.bookedTickets.push(ticket._id);
    await user.save();

    res.status(201).json({
      message: "Tạo ticket thành công",
      ticket,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  createTicket,
};
