const express = require('express');
const router = express.Router();
const Categorie = require('../models/Categorie');

router.post('/', async (req, res) => {
  const categorie = new Categorie({
    nom: req.body.nom,
  });

  try {
    const newCategorie = await categorie.save();
    res.status(201).json(newCategorie); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.json(categories); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categorie = await Categorie.findOne({ id_categorie: req.params.id }); 
    if (!categorie) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(categorie); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const categorie = await Categorie.findOne({ id_categorie: req.params.id }); 
    if (!categorie) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (req.body.nom != null) categorie.nom = req.body.nom;

    const updatedCategorie = await categorie.save();
    res.json(updatedCategorie); 
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const categorie = await Categorie.findOneAndDelete({ id_categorie: req.params.id }); 
    if (!categorie) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted' }); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
