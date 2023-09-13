const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({

    creation: {
      type: Date,
    },
    montant: {
      type: String,
      required: true,
    },
    comment: {
        type: String,
        
      },
    produits: [
      {prod_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      weight: { type: Number },
      quantity: { type: Number },
      prix_total:{type:Number},
      prix_unite:{type:Number}
    }
    ],
    user_id: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },

    livraison: {
      type: String,
      enum: ['domicile', 'pickup'],
      required: true,
    },
    statut: {
      type: String,
      enum: ['En cours de livraison', 'Arrivé à destination', 'Demande en cours de traitement','Annulé','Livré'],
      default: 'Demande en cours de traitement',
    },
    jours: {
      type: String,
      
    },
    date:{
      type: String,
      
    },
  });

  module.exports = mongoose.model('Commande', commandeSchema);