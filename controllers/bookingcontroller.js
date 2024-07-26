const { createBooking, getBookingById } = require('../models/booking');

const bookTicket = async (req, res) => {
  try {
    const { scheduleId, seatNumber, passengerInfo } = req.body;
    const bookingId = await createBooking(req.userId, scheduleId, seatNumber, passengerInfo);
    res.status(201).send({ bookingId });
  } catch (error) {
    res.status(500).send({ error: 'Booking failed' });
  }
};

const getBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);
    if (!booking) {
      return res.status(404).send({ error: 'Booking not found' });
    }
    res.send(booking);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch booking' });
  }
};

module.exports = { bookTicket, getBooking };
