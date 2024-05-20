const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const medicineSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
    },
    category: {
      type: String,
      enum: ["headache", "back-pain", "heart", "leg-pain", "mouth", "stomach"],
      default: "headache",
    },
    quantity: {
      type: Number,
      required: [true, "Please provide a number of pills"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
