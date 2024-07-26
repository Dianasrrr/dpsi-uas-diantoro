const db = require('../utils/firestore');

const createPayment = async (bookingId, paymentMethod, amount) => {
  const paymentRef = db.collection('payments').doc();
  await paymentRef.set({
    bookingId,
    paymentMethod,
    amount,
    status: 'success',
    createdAt: new Date().toISOString()
  });
  return paymentRef.id;
};

const getPaymentById = async (id) => {
  const paymentRef = db.collection('payments').doc(id);
  const doc = await paymentRef.get();
  if (!doc.exists) {
    return null;
  }
  return { id: doc.id, ...doc.data() };
};

module.exports = { createPayment, getPaymentById };
