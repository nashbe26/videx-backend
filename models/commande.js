const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema(
  {
    montant: {
      type: String,
      required: true,
    },
    produits: [
      {
        prod_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          autopopulate: true,
        },
        quantity: { type: Number },
        prix_total: { type: Number },
        prix_unite: { type: Number },
      },
    ],
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentType: {
      type: String,
      default: "pickup",
    },
    notes: {
      type: String,
    },
    date: {
      type: String,
    },
    qr_code: {
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

module.exports = mongoose.model("Commande", commandeSchema);
