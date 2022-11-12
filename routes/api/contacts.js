const router = require('express').Router();
const ctrlrs = require('../../controllers/contactCtrlrs');
const idCheck = require('../../middlewares/idCheck');
const ctrlWrapper = require('../../helpers/ctrlWrapper')
const authmid = require('../../middlewares/authmid');

router.get('/', authmid, ctrlWrapper(ctrlrs.listContacts));

router.get('/:contactId', authmid, idCheck, ctrlWrapper(ctrlrs.getContactById));

router.post('/', authmid, ctrlWrapper(ctrlrs.addContact));

router.delete('/:contactId', authmid, idCheck, ctrlWrapper(ctrlrs.removeContact));

router.put('/:contactId', authmid, idCheck, ctrlWrapper(ctrlrs.updateContact));

router.patch('/:contactId/favorite', authmid, ctrlWrapper(idCheck, ctrlrs.updateFavorite));

module.exports = router;
