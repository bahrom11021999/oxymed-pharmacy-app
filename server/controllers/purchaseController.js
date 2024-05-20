const catchAsync = require("../utils/catchAsync");
const Purchase = require("../models/purchaseModel");

exports.getAllPurchases = catchAsync(async (req, res) => {
  const filter = req.user.role === "admin" ? {} : { user: req.user.id };
  const populateFilter =
    req.user.role === "admin"
      ? "user medicines.medicine"
      : "medicines.medicine";

  const purchases = await Purchase.find(filter).populate(populateFilter);

  res.status(200).json({
    status: "success",
    data: purchases,
  });
});

exports.createPurchase = catchAsync(async (req, res) => {
  const input = {
    medicines: req.body.medicines,
    user: req.user.id,
    total: req.body.total,
    deliveryAddress: req.body.deliveryAddress,
    paymentMethod: req.body.paymentMethod,
  };

  const newPurchase = await Purchase.create(input);
  const purchase = await newPurchase.populate("medicines.medicine");

  res.status(201).json({
    status: "success",
    data: purchase,
  });
});
