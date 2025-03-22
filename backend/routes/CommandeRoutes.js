const express = require('express');
const router = express.Router();
const Commande = require('../models/Commandes') 

router.get('/', async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching commandes', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const commande = await Commande.findOne({ id_commande: req.params.id });
    if (!commande) {
      return res.status(404).json({ message: 'Commande not found' });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching commande', error });
  }
});
router.post('/', async (req, res) => {
  try {
    const newCommande = new Commande({
      id_article:req.body.id_article,
      quantite: req.body.quantite,
      id_fournisseur: req.body.id_fournisseur,
    });
    const savedCommande = await newCommande.save();
    res.status(201).json(savedCommande);
  } catch (error) {
    console.error('Error creating commande:', error);  
    res.status(400).json({ message: 'Error creating commande', error: error.message || error });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedCommande = await Commande.findOneAndDelete({ id_commande: req.params.id });
    if (!deletedCommande) {
      return res.status(404).json({ message: 'Commande not found' });
    }
    res.status(200).json({ message: 'Commande deleted successfully', deletedCommande });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting commande', error });
  }
});
router.patch('/:id/statut', async (req, res) => {
  try {
    const { id } = req.params;
    const statut = req.body["statut"];

    if (statut !== 'non' && statut !== 'arrive') {
      return res.status(400).json({ message: 'Status must be either "non" or "arrive"' });
    }

    const com = await Commande.findOne({ id_commande: req.params.id })
    if (!com) {
      return res.status(404).json({ error: 'Commande not found' });
    }

    com.statut = statut;
    await com.save();

    res.status(200).json({ message: `Commande status updated to ${statut}` });

  } catch (error) {
    console.error("Error in /:id/statut route:", error);  
    res.status(500).json({ message: 'Error updating commande', error: error.message });
  }
});

router.post('/recherche', async (req, res) => {
  try {
    const commande = await Commande.findOne({ date_commande:req.body.date });
    if (!commande) {
      return res.status(404).json({ message: 'Commande not found' });
    }
    res.status(200).json(commande);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching commande', error });
  }
});


module.exports = router;
