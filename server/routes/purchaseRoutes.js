const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, purchaseController.getAllPurchases)
  .post(authController.protect, purchaseController.createPurchase);

module.exports = router;
