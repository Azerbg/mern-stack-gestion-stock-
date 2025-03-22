const express = require("express");
const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const Rapport = require("../models/Rapport");
const Article = require("../models/Article");
const Commande = require("../models/Commandes");
const Fournisseur = require("../models/Fournisseur");
const Categorie = require("../models/Categorie");


const router = express.Router();
router.post("/generate", async (req, res) => {
  try {
    const articles = await Article.find();
    const commandes = await Commande.find();
    const fournisseurs = await Fournisseur.find();
    const categories = await Categorie.find();

    const rapport = new Rapport({
      articles,
      commandes,
      fournisseurs,
      categories,
      fileName: `rapport_${Date.now()}.pdf`,  
    });
    await rapport.save();

    const doc = new PDFDocument({ size: 'A4' });
    const fileName = rapport.fileName;  
    const filePath = path.join(__dirname, "../public/reports", fileName);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    doc.pipe(fs.createWriteStream(filePath));

    doc.fontSize(18).text("Rapport d'Inventaire", { align: "center" }).moveDown(1); 

    doc.fontSize(14).text("Articles:", { underline: true }).moveDown(0.5);
    articles.forEach((article, index) => {
      doc.text(
        `#${index + 1} - Nom: ${article.nom}, Quantité: ${article.quantite}, Prix: ${article.prix}`,
        { width: 500, align: 'left' }
      );
    });
    doc.moveDown(1);

    doc.fontSize(14).text("Commandes:", { underline: true }).moveDown(0.5);
    commandes.forEach((commande, index) => {
      doc.text(
        `#${index + 1} - Article ID: ${commande.id_article}, Quantité: ${commande.quantite}, Statut: ${commande.statut}`,
        { width: 500, align: 'left' }
      );
    });
    doc.moveDown(1);

    doc.fontSize(14).text("Fournisseurs:", { underline: true }).moveDown(0.5);
    fournisseurs.forEach((fournisseur, index) => {
      doc.text(
        `#${index + 1} - Nom: ${fournisseur.nom}, Email: ${fournisseur.email}`,
        { width: 500, align: 'left' }
      );
    });
    doc.moveDown(1);

    doc.fontSize(14).text("Catégories:", { underline: true }).moveDown(0.5);
    categories.forEach((categorie, index) => {
      doc.text(
        `#${index + 1} - Nom: ${categorie.nom}`,
        { width: 500, align: 'left' }
      );
    });

    doc.end();

    rapport.filePath = filePath;  
    await rapport.save();

    res.status(201).json({ message: "Rapport généré avec succès", fileName });
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur lors de la génération du rapport" });
  }
});

router.get("/rapportinventaire", async (req, res) => {
  try {
    const rapports = await Rapport.find();
    res.status(200).json(rapports);
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur lors de la récupération des rapports" });
  }
});
router.get("/rapportinventaire/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const rapport = await Rapport.findById(id);

    if (!rapport) {
      return res.status(404).json({ message: "Rapport introuvable" });
    }

    res.sendFile(path.resolve(rapport.filePath));
  } catch (error) {
    console.error("Erreur :", error);
    res.status(500).json({ message: "Erreur lors de la récupération du rapport" });
  }
});

module.exports = router;
