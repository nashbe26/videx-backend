const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
  {
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      autopopulate: true,
    },
    orderNumber: {
      type: Number,
    },
    qr_code: {
      type: String,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
    vidange: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      autopopulate: true,
    },
    date: {
      type: String,
    },

    enabled: {
      type: Boolean,
      default: true,
    },
    removed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
commandeSchema.plugin(require("mongoose-autopopulate"));

module.exports = mongoose.model("Vidange", commandeSchema);
