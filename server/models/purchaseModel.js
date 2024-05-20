const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const purchaseModel = new Schema(
  {
    medicines: [
      {
        medicine: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Medicine",
          required: [true, "Please provide a medicine id"],
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a user id"],
    },
    total: {
      type: Number,
      required: [true, "Please provide a total value"],
    },
    deliveryAddress: {
      type: String,
      required: [true, "Please provide a delivery address"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Please provide a payment method"],
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

const Purchase = mongoose.model("Purchase", purchaseModel);

module.exports = Purchase;
