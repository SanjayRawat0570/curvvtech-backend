const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const signup = async (userData) => {
  const existingUser = await User.findOne({ where: { email: userData.email } });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  await User.create(userData);
  return { success: true, message: 'User registered successfully' };
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return {
    success: true,
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

module.exports = { signup, login };