const express = require('express');
const { createContact, getAllContacts, getContactById, updateContact, deleteContact } = require('../controller/contact.controller');
const { authorize, SUPER_ADMIN, LOGGED_USER } = require('../middleware/jwt.auth');

const router = express.Router();


router.post('/create-contact',authorize(LOGGED_USER), createContact);
router.get('/get-all-contact',authorize(SUPER_ADMIN), getAllContacts);
router.get('/get-one-contact/:id',authorize(SUPER_ADMIN), getContactById);
router.put('/update-contact/:id',authorize(SUPER_ADMIN), updateContact);
router.delete('/delete-contact/:id',authorize(SUPER_ADMIN), deleteContact);

module.exports = router;