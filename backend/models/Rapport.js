const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const rapportSchema = new mongoose.Schema({
  id_rapport: {
    type: Number,
    unique: true,
  },
  date_generation: {
    type: Date,
    required: true,
    default: Date.now,
  },
  fileName: { // Added this line
    type: String,
    required: true, // This can be required or not based on your needs
  },
  articles: [
    {
      id_article: Number,
      nom: String,
      id_categorie: Number,
      quantite: Number,
      seuil_critique: Number,
      prix: Number,
    },
  ],
  commandes: [
    {
      id_commande: Number,
      id_article: Number,
      quantite: Number,
      id_fournisseur: Number,
      date_commande: Date,
      statut: String,
    },
  ],
  fournisseurs: [
    {
      id_fournisseur: Number,
      nom: String,
      email: String,
      telephone: String,
    },
  ],
  categories: [
    {
      id_categorie: Number,
      nom: String,
    },
  ],
});

rapportSchema.plugin(AutoIncrement, { inc_field: 'id_rapport' });

module.exports = mongoose.model('Rapport', rapportSchema);
