const { createPayment, getPaymentById } = require('../models/payment');

const makePayment = async (req, res) => {
  try {
    const { bookingId, paymentMethod, amount } = req.body;
    const paymentId = await createPayment(bookingId, paymentMethod, amount);
    res.status(201).send({ paymentId });
  } catch (error) {
    res.status(500).send({ error: 'Payment failed' });
  }
};

const getPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await getPaymentById(id);
    if (!payment) {
      return res.status(404).send({ error: 'Payment not found' });
    }
    res.send(payment);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch payment' });
  }
};

module.exports = { makePayment, getPayment };
