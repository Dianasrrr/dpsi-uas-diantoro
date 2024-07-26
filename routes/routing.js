const express = require('express');
const { register, login } = require('../controllers/authcontroller');
const { getSchedules, getSchedule, createNewSchedule } = require('../controllers/schedulecontroller');
const { bookTicket, getBooking } = require('../controllers/bookingcontroller');
const { makePayment, getPayment } = require('../controllers/paymentcontroller');
const authenticate = require('../middleware/authmiddleware');

const router = express.Router();

// Auth routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Schedule routes
router.get('/schedules', getSchedules);
router.get('/schedules/:id', getSchedule);
router.post('/schedules', createNewSchedule);

// Booking routes
router.post('/bookings', authenticate, bookTicket);
router.get('/bookings/:id', authenticate, getBooking);

// Payment routes
router.post('/payments', authenticate, makePayment);
router.get('/payments/:id', authenticate, getPayment);

module.exports = router;
