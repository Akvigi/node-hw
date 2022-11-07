const router = require('express').Router();
const ctrlrs = require('../../controllers/contactCtrlrs');
const idCheck = require('../../middlewares/idCheck');
const ctrlWrapper = require('../../helpers/ctrlWrapper')

router.get('/', ctrlWrapper(ctrlrs.listContacts));

router.get('/:contactId', idCheck, ctrlWrapper(ctrlrs.getContactById));

router.post('/', ctrlWrapper(ctrlrs.addContact));

router.delete('/:contactId', idCheck, ctrlWrapper(ctrlrs.removeContact));

router.put('/:contactId', idCheck, ctrlWrapper(ctrlrs.updateContact));

router.patch('/:contactId/favorite', ctrlWrapper(idCheck, ctrlrs.updateFavorite));

module.exports = router;
