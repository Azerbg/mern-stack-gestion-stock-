const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const articleSchema = new mongoose.Schema({
  id_article: {
    type: Number,
   
  },
  nom: {
    type: String,
    required: true,
  },
  id_categorie: {  
    type: Number,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  seuil_critique: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  
  imagebase64: {
    type: String,
  },
});

articleSchema.plugin(AutoIncrement, { inc_field: 'id_article' });

module.exports = mongoose.model('Article', articleSchema);
