const Joi = require('joi');

 const commandeSchema = Joi.object({
  montant: Joi.number().required(),
  comment: Joi.string().min(0),
  statut: Joi.string(),
  livraison: Joi.string().required(),
  produits:Joi.array().required(),
  jours:Joi.string(),
  date:Joi.string(),
  creation:Joi.date(),
});


module.exports = {
    commandeSchema
}
