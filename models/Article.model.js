const mongoose = require('mongoose');

/**
 * Schéma Article pour MongoDB
 * Définit la structure et les validations pour les articles
 */
const articleSchema = new mongoose.Schema({
  // Titre de l'article (obligatoire)
  title: {
    type: String,
    required: [true, 'Le titre est obligatoire'],
    trim: true,
    maxlength: [100, 'Le titre ne peut pas dépasser 100 caractères'],
    minlength: [3, 'Le titre doit contenir au moins 3 caractères']
  },
  
  // Contenu de l'article (obligatoire)
  content: {
    type: String,
    required: [true, 'Le contenu est obligatoire'],
    trim: true,
    minlength: [10, 'Le contenu doit contenir au moins 10 caractères']
  },
  
  // Auteur de l'article (optionnel)
  author: {
    type: String,
    trim: true,
    maxlength: [50, 'Le nom de l\'auteur ne peut pas dépasser 50 caractères'],
    default: null
  }
}, {
  // Ajoute automatiquement createdAt et updatedAt
  timestamps: true,
  
  // Options pour la sérialisation JSON
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  
  // Options pour la sérialisation d'objet
  toObject: {
    virtuals: true
  }
});

/**
 * Index pour améliorer les performances des requêtes
 */
articleSchema.index({ title: 'text', content: 'text' });
articleSchema.index({ createdAt: -1 });
articleSchema.index({ author: 1 });

/**
 * Méthodes statiques
 */
articleSchema.statics = {
  /**
   * Trouver les articles par auteur
   */
  findByAuthor: function(author) {
    return this.find({ author: author }).sort({ createdAt: -1 });
  },
  
  /**
   * Rechercher dans les articles
   */
  search: function(query) {
    return this.find({
      $text: { $search: query }
    }).sort({ score: { $meta: 'textScore' } });
  }
};

/**
 * Middleware pre-save pour validation personnalisée
 */
articleSchema.pre('save', function(next) {
  // Validation personnalisée si nécessaire
  if (this.title && this.title.length < 3) {
    return next(new Error('Le titre doit contenir au moins 3 caractères'));
  }
  next();
});

/**
 * Virtual pour l'URL de l'article
 */
articleSchema.virtual('url').get(function() {
  return `/api/articles/${this._id}`;
});

/**
 * Virtual pour le résumé du contenu
 */
articleSchema.virtual('summary').get(function() {
  if (this.content) {
    return this.content.substring(0, 150) + (this.content.length > 150 ? '...' : '');
  }
  return '';
});

// Créer et exporter le modèle
const Article = mongoose.model('Article', articleSchema);

module.exports = Article; 