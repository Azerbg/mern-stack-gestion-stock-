const express = require('express');
const router = express.Router();
const Fournisseur = require('../models/Fournisseur');

router.post('/', async (req, res) => {
  try {
    const newFournisseur = new Fournisseur({
      nom: req.body.nom,
      email: req.body.email,
      telephone: req.body.telephone,
    });

    const savedFournisseur = await newFournisseur.save();
    res.status(201).json(savedFournisseur);
  } catch (error) {
    console.error('Error creating fournisseur:', error);
    res.status(400).json({ message: 'Error creating fournisseur', error });
  }
});

router.get('/', async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.status(200).json(fournisseurs);
  } catch (error) {
    console.error('Error retrieving fournisseurs:', error);
    res.status(500).json({ message: 'Error retrieving fournisseurs', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findById(req.params.id);
    if (!fournisseur) {
      return res.status(404).json({ message: 'Fournisseur not found' });
    }
    res.status(200).json(fournisseur);
  } catch (error) {
    console.error('Error retrieving fournisseur:', error);
    res.status(500).json({ message: 'Error retrieving fournisseur', error });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updatedFournisseur = await Fournisseur.findOneAndUpdate(
      { id_fournisseur: req.params.id }, 
      {
        nom: req.body.nom,
        email: req.body.email,
        telephone: req.body.telephone,
      },
      { new: true, runValidators: true } 
    );

    if (!updatedFournisseur) {
      return res.status(404).json({ message: 'Fournisseur not found' });
    }
    res.status(200).json(updatedFournisseur);
  } catch (error) {
    console.error('Error updating fournisseur:', error);
    res.status(400).json({ message: 'Error updating fournisseur', error });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedFournisseur = await Fournisseur.findByIdAndDelete(req.params.id);

    if (!deletedFournisseur) {
      return res.status(404).json({ message: 'Fournisseur not found' });
    }

    res.status(200).json({ message: 'Fournisseur deleted successfully' });
  } catch (error) {
    console.error('Error deleting fournisseur:', error);
    res.status(500).json({ message: 'Error deleting fournisseur', error });
  }
});

module.exports = router;
