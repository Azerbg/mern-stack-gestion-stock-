const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const fournisseurSchema = new mongoose.Schema({
  id_fournisseur: {
    type: Number,
    unique: true,
  },
  nom: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'], 
  },
  telephone: {
    type: String,
    required: true,
    match: [/^\d+$/, 'Please use a valid phone number'], 
  },
});

fournisseurSchema.plugin(AutoIncrement, { inc_field: 'id_fournisseur' });

module.exports = mongoose.model('Fournisseur', fournisseurSchema);
