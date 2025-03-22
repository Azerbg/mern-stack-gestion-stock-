const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Categorie = require('../models/Categorie'); 
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().populate('id_categorie'); 
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findOne({ id_article: req.params.id }).populate('id_categorie');
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const category = await Categorie.findOne({ id_categorie: req.body.id_categorie });
  if (!category) {
    return res.status(400).json({ message: 'Category not found' });
  }

  const article = new Article({
    nom: req.body.nom,
    id_categorie: req.body.id_categorie,
    quantite: req.body.quantite,
    seuil_critique: req.body.seuil_critique,
    prix: req.body.prix,
    description: req.body.description,
    imagebase64: req.body.imagebase64
  });
  
  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const article = await Article.findOne({ id_article: req.params.id });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    if (req.body.nom != null) article.nom = req.body.nom;
    if (req.body.id_categorie != null) article.id_categorie = req.body.id_categorie;
    if (req.body.quantite != null) article.quantite = req.body.quantite;
    if (req.body.seuil_critique != null) article.seuil_critique = req.body.seuil_critique;
    if (req.body.prix != null) article.prix = req.body.prix;
    if (req.body.description != null) article.description = req.body.description;
    if (req.body.imagebase64 != null) article.imagebase64 = req.body.imagebase64;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findOneAndDelete({ id_article: Number(req.params.id) });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
