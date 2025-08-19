const authService = require('../services/auth.service');
const { signupSchema, loginSchema } = require('../validations/user.validation');

const signup = async (req, res, next) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const result = await authService.signup(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(409).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

module.exports = { signup, login };