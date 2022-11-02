const { isValidObjectId } = require('mongoose');
const createError = require('http-errors');

const idCheck = (req, res, next) => {
  const result = isValidObjectId(req.params.contactId);
  if (!result) {
    throw createError(400, `Invalid format id`);
  }
  next();
};

module.exports = idCheck;
