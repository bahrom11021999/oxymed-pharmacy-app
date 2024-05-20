const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const medicineController = require("../controllers/medicineController");
const purchaseController = require("../controllers/purchaseController");

// Purchase
router.get(
  "/purchases/",
  authController.protect,
  authController.restrictTo("admin"),
  purchaseController.getAllPurchases,
);

// Users
router.get(
  "/users",
  authController.protect,
  authController.restrictTo("admin"),
  userController.getAllUsers,
);

// Medicine
router
  .route("/medicine")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    medicineController.getAllMedicine,
  )
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    medicineController.createMedicine,
  );
router
  .route("/medicine/:id")
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    medicineController.deleteMedicine,
  );

module.exports = router;
