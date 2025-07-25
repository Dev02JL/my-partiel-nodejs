const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères']
  },
  content: {
    type: String,
    required: [true, 'Le contenu est obligatoire'],
    trim: true
  },
  author: {
    type: String,
    trim: true,
    maxlength: [50, 'Le nom de l\'auteur ne peut pas dépasser 50 caractères']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema); 