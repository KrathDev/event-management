const mongoose = require("mongoose");
const ticketService = require("../services/ticket.service");
const eventService = require("../services/event.service");
const userService = require("../services/user.service");

// [POST] /api/v1/tickets
const createTicket = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const eventId = req.body.eventId;
    const userId = req.user.userId;

    // Check tickets available
    const event = await eventService.findEventById(eventId);
    if (event.ticketsAvailable <= 0 || !event) {
      session.endSession();
      return res.status(400).json({
        message: "Sự kiện đã hết vé",
      });
    }

    //Create ticket
    const ticketData = { event: eventId, user: userId };
    const ticket = await ticketService.createTicket(ticketData, session);

    event.ticketsAvailable -= 1;
    await event.save({ session });

    const user = await userService.findUserById(userId);
    user.bookedTickets.push(ticket._id);
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: "Tạo ticket thành công",
      ticket,
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// [GET] /api/v1/tickets/user
const getTicketsOfUser = async (req, res) => {
  const userId = req.user.userId;

  try {
    const find = { user: userId, status: "active" };
    const tickets = await ticketService.getTicketsOfUser(find);

    if (tickets.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy ticket nào",
      });
    }

    res.status(200).json({
      message: "Lấy danh sách ticket thành công",
      tickets,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// [PACTH] /api/v1/tickets/:id
const cancelTicket = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const ticketId = req.params.id;
    const userId = req.user.userId;

    const ticket = await ticketService.findTicketById(ticketId);

    if (!ticket) {
      return res.status(404).json({
        message: "Không tìm thấy ticket",
      });
    }

    if (ticket.user.toString() !== userId) {
      return res.status(403).json({
        message: "Bạn không có quyền hủy ticket này",
      });
    }

    ticket.status = "cancelled";
    await ticket.save({ session });

    const event = await eventService.findEventById(ticket.event);

    if (!event) {
      return res.status(404).json({
        message: "Không tìm thấy sự kiện",
      });
    }

    event.ticketsAvailable += 1;
    await event.save({ session });

    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({
        message: "Không tìm thấy người dùng",
      });
    }

    user.bookedTickets = user.bookedTickets.filter(
      (ticket) => ticket.toString() !== ticketId
    );
    await user.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: "Hủy ticket thành công",
      ticket,
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = {
  createTicket,
  getTicketsOfUser,
  cancelTicket,
};
