const Contact = require('../models/contact');
const createError = require('http-errors');
const { schemas } = require('../schemas/schemas');

const listContacts = async (req, res, next) => {
    const data = await Contact.find();
    res.status(200).json(data);
};

const getContactById = async (req, res, next) => {
    const data = await Contact.findById(req.params.contactId);
    if (!data) {
      throw createError(404, `Contact with id=${req.params.contactId} not found`);
    }
    res.status(200).json(data)
};

const addContact = async (req, res, next) => {
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const resp = await Contact.create(req.body);
    res.status(201).json(resp);
};

const updateContact = async (req, res, next) => {
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
};

const removeContact = async (req, res, next) => {
    const data = await Contact.findByIdAndDelete(req.params.contactId);
    if (!data) {
      throw createError(404, `Contact with id=${req.params.contactId} not found`);
    }
    res.status(200).json({ message: `contact with id ${req.params.contactId} successful deleted` });
};

const updateFavorite = async (req, res, next) => {
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
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
