const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const commandeSchema = new mongoose.Schema({
  id_commande: {
    type: Number,
    unique: true, 
  },
  id_article: {
    type: Number,
    required: true, 
    ref: 'Article', 
  },
  quantite: {
    type: Number,
    required: true,
  },
  id_fournisseur: {
    type: Number,
    required: true,
    ref: 'Fournisseur',
  },
  date_commande: {
    type: Date,
    required: true,
    default: Date.now,
  },
  statut: {
    type: String,
    enum: ['arrive', 'non'], 
    required: true,
    default: 'non', 
  },
});

commandeSchema.plugin(AutoIncrement, { inc_field: 'id_commande' });

module.exports = mongoose.model('Commande', commandeSchema);
