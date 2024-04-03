const express = require('express');
const { createCommande, getAllCommandes, getCommandeById, updateCommande, updateCommandeStatus, deleteCommande, getCommandeByUserId, getCommandeByMyId } = require('../controller/commande.controller');
const { validateCommande } = require('../middleware/commande.middleware');
const { LOGGED_USER, SUPER_ADMIN, authorize } = require('../middleware/jwt.auth');
const { createCar, getCarByMyId } = require('../controller/car.controller');
const router = express.Router();

// Importez le modèle de commande

router.post('/create-car',authorize([LOGGED_USER,SUPER_ADMIN]),createCar);
router.get('/get-all-commandes',authorize(SUPER_ADMIN), getAllCommandes);
router.get('/get-one-commande/:id',authorize(SUPER_ADMIN), getCommandeById);
router.get('/get-all-commande-by-user/:id',authorize(SUPER_ADMIN),getCommandeByUserId );
router.get('/get-my-car',authorize([LOGGED_USER,SUPER_ADMIN]), getCarByMyId );
router.put('/update-commande/:id',authorize(LOGGED_USER), updateCommande);
router.put('/update-commande-status/:id',authorize(SUPER_ADMIN), updateCommandeStatus);

router.delete('/delete-commande/:id',authorize([SUPER_ADMIN,LOGGED_USER]), deleteCommande);

module.exports = router;    