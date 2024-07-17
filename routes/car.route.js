const express = require("express");
const {
  createCommande,
  getAllCommandes,
  getCommandeById,
  updateCommandeStatus,
  getCommandeByUserId,
  getCommandeByMyId,
} = require("../controller/commande.controller");
const { validateCommande } = require("../middleware/commande.middleware");
const {
  LOGGED_USER,
  SUPER_ADMIN,
  authorize,
} = require("../middleware/jwt.auth");
const {
  createCar,
  getCarByMyId,
  updateCar,
  deleteCar,
} = require("../controller/car.controller");
const router = express.Router();

// Importez le modèle de commande

router.post("/create", authorize([LOGGED_USER, SUPER_ADMIN]), createCar);
router.get("/get-all", authorize(SUPER_ADMIN), getAllCommandes);
router.get("/get-one/:id", authorize(SUPER_ADMIN), getCommandeById);
router.get("/get-all-by-user/:id", authorize(SUPER_ADMIN), getCommandeByUserId);
router.get("/get-my-car", authorize([LOGGED_USER, SUPER_ADMIN]), getCarByMyId);
router.put("/update", authorize(LOGGED_USER), updateCar);
router.put(
  "/update-commande-status/:id",
  authorize(SUPER_ADMIN),
  updateCommandeStatus
);

router.delete("/delete/:id", authorize([SUPER_ADMIN, LOGGED_USER]), deleteCar);

module.exports = router;
