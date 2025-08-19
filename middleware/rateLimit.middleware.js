const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_MINUTES) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS),
  message: "Too many requests from this IP, please try again after a few minutes.",
});

module.exports = limiter;