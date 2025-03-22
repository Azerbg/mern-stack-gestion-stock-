const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorieSchema = new mongoose.Schema({
  id_categorie: {
    type: Number,  
  },
  nom: {
    type: String,
    required: true,
  }
});

categorieSchema.plugin(AutoIncrement, { inc_field: 'id_categorie' });

module.exports = mongoose.model('Categorie', categorieSchema);
