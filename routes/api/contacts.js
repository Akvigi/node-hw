const express = require('express');
const ctrlrs = require('../../controllers/ctrlrs');
const idCheck = require('../../middlewares/idCheck');
const router = express.Router();

router.get('/', ctrlrs.listContacts);

router.get('/:contactId', idCheck, ctrlrs.getContactById);

router.post('/', ctrlrs.addContact);

router.delete('/:contactId', idCheck, ctrlrs.removeContact);

router.put('/:contactId', idCheck, ctrlrs.updateContact);

router.patch('/:contactId/favorite', idCheck, ctrlrs.updateFavorite);

module.exports = router;
