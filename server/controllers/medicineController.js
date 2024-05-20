const catchAsync = require("../utils/catchAsync");
const Medicine = require("../models/medicineModel");

exports.getAllMedicine = catchAsync(async (req, res) => {
  const medicine = await Medicine.find();

  res.status(200).json({
    status: "success",
    data: medicine,
  });
});

exports.getMedicine = catchAsync(async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: medicine,
  });
});

exports.createMedicine = catchAsync(async (req, res) => {
  const input = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  const medicine = await Medicine.create(input);

  res.status(200).json({
    status: "success",
    data: medicine,
  });
});

exports.deleteMedicine = catchAsync(async (req, res) => {
  const medicine = await Medicine.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: medicine,
  });
});
