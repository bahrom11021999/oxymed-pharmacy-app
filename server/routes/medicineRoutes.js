const express = require("express");
const medicineController = require("../controllers/medicineController");

const router = express.Router();

router.route("/").get(medicineController.getAllMedicine);

router.route("/:id").get(medicineController.getMedicine);

module.exports = router;
