# Modèle Article

## Description

Le modèle `Article.model.js` définit la structure et les validations pour les articles dans l'application.

## Structure du modèle

### Champs obligatoires
- **title** (String) : Titre de l'article (3-100 caractères)
- **content** (String) : Contenu de l'article (minimum 10 caractères)

### Champs optionnels
- **author** (String) : Nom de l'auteur (maximum 50 caractères)

### Champs automatiques
- **createdAt** (Date) : Date de création
- **updatedAt** (Date) : Date de dernière modification

## Fonctionnalités

### Méthodes statiques
- `Article.findByAuthor(author)` : Trouver les articles par auteur
- `Article.search(query)` : Rechercher dans les articles

### Virtuals
- `article.url` : URL de l'article
- `article.summary` : Résumé du contenu (150 caractères)

## Exemple d'utilisation

```javascript
const Article = require('./models/Article.model');

// Créer un article
const article = new Article({
  title: 'Mon article',
  content: 'Contenu de l\'article',
  author: 'Jean-Louis'
});

// Sauvegarder
await article.save();

// Utiliser les virtuals
console.log(article.summary); // Résumé automatique
console.log(article.url); // URL de l'article
```

## Index de performance

- Index textuel sur `title` et `content`
- Index sur `createdAt` (tri décroissant)
- Index sur `author` 