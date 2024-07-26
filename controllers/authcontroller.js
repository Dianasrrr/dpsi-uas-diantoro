const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, getUserByEmail } = require('../models/user');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userId = await createUser(email, password);
    res.status(201).send({ userId });
  } catch (error) {
    res.status(500).send({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Login failed' });
  }
};

module.exports = { register, login };
