const Contact = require('../models/contact');
const createError = require('http-errors');
const { schemas } = require('../schemas/schemas');

const listContacts = async (req, res, next) => {
  try {
    const data = await Contact.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const data = await Contact.findById(req.params.contactId);
    if (!data) {
      throw createError(404, `Contact with id=${req.params.contactId} not found`);
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const resp = await Contact.create(req.body);
    res.status(201).json(resp);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const data = await Contact.findByIdAndUpdate(req.params.contactId, req.body, {
      new: true,
    });
    if (!data) {
      throw createError(404, `Contact with id=${req.params.contactId} not found`);
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const data = await Contact.findByIdAndDelete(req.params.contactId);
    if (!data) {
      throw createError(404, `Contact with id=${req.params.contactId} not found`);
    }
    res.status(200).json({ message: `contact with id ${req.params.contactId} successful deleted` });
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const data = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!data) {
      throw createError(404, 'missing field favorite');
    }
    res.status(200).json({ message: `changed favorite param of contact with id ${contactId}` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
