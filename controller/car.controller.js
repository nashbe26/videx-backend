const Car = require('../models/car');
;

const createCar = async (req, res) => {
    try {
     
      const nouvelleCommande = new Car(req.body);
      nouvelleCommande.user_id = req.route.meta.user._id;

      const commande = await nouvelleCommande.save();
      
      res.status(200).json(commande);
    
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  };
  
  const getAllCommandes = async (req, res) => {
    try {
      const commandes = await Car.find().populate('produits.prod_id user_id');
      res.status(200).json(commandes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const getCommandeById = async (req, res) => {
    try {
      const commande = await Car.findById(req.params.id).populate('produits.prod_id user_id');
      if (!commande) {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }
      res.status(200).json(commande);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
    
  const getCarByMyId = async (req, res) => {
    try {
      const commande = await Car.find({user_id:req.route.meta.user._id}).sort({'createdAt':-1});
      if (!commande) {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }
      res.status(200).json(commande);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: error.message });
    }
  };

    
  const getCommandeByUserId = async (req, res) => {
    try {
      const commande = await Car.find({user_id:req.params.id}).populate('produits.prod_id');
      if (!commande) {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }
      res.status(200).json(commande);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateCommande = async (req, res) => {
    try {
      const { numero, date, montant, produits, livraison, statut } = req.body;
      const commande = await Car.findByIdAndUpdate(
        req.params.id,
        {
          numero,
          date,
          montant,
          produits,
          livraison,
          statut,
        },
        { new: true }
      );
      if (!commande) {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }
      res.status(200).json(commande);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateCommandeStatus = async (req, res) => {
    try {
      const { type,id_prods } = req.body;
      console.log(req.body);
      const commande = await Car.findByIdAndUpdate(
        req.params.id,
        {
          statut:type,
        },
        { new: true }
      );
      if (!commande) {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }
      if(type === "Livré")
      id_prods.map(async prod=>{
        const prods = await Product.findById(prod.prod_id._id)
        prods.quantity = prods.quantity - prod.quantity;
        
        if(prods.quantity == 0)
          prods.statusProd = "épuisé"
  
        prods.save();
      })

      res.status(200).json(commande);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  const deleteCommande = async (req, res) => {
    try {
      const commande = await Car.findByIdAndDelete(req.params.id);
      if (!commande) {
        return res.status(404).json({ error: 'Commande non trouvée' });
      }
      res.status(200).json({ message: 'Commande supprimée avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  module.exports = {
    createCar,
    getAllCommandes,
    getCommandeById,
    updateCommande,
    deleteCommande,
    updateCommandeStatus,
    getCarByMyId,
    getCommandeByUserId
  }