const db = require('../utils/firestore');

const createBooking = async (userId, scheduleId, seatNumber, passengerInfo) => {
  const bookingRef = db.collection('bookings').doc();
  await bookingRef.set({
    userId,
    scheduleId,
    seatNumber,
    passengerInfo,
    createdAt: new Date().toISOString()
  });
  return bookingRef.id;
};

const getBookingById = async (id) => {
  const bookingRef = db.collection('bookings').doc(id);
  const doc = await bookingRef.get();
  if (!doc.exists) {
    return null;
  }
  return { id: doc.id, ...doc.data() };
};

module.exports = { createBooking, getBookingById };
