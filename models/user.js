const db = require('../utils/firestore');
const bcrypt = require('bcryptjs');

const createUser = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const userRef = db.collection('users').doc();
  await userRef.set({ email, password: hashedPassword });
  return userRef.id;
};

const getUserByEmail = async (email) => {
  const userRef = db.collection('users').where('email', '==', email);
  const snapshot = await userRef.get();
  if (snapshot.empty) {
    return null;
  }
  return snapshot.docs[0].data();
};

module.exports = { createUser, getUserByEmail };
