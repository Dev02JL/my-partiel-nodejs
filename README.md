# API Articles - Node.js + Express + MongoDB

Une API REST simple pour gérer des articles avec Node.js, Express et MongoDB.

## Fonctionnalités

- **GET /api/articles** - Récupérer tous les articles
- **GET /api/articles/:id** - Récupérer un article par ID
- **POST /api/articles** - Créer un nouvel article
- **DELETE /api/articles/:id** - Supprimer un article

## Structure d'un Article

```json
{
  "title": "Titre de l'article (obligatoire)",
  "content": "Contenu de l'article (obligatoire)",
  "author": "Nom de l'auteur (optionnel)"
}
```

## Installation

1. **Cloner le projet**
   ```bash
   git clone git@github.com:Dev02JL/my-partiel-nodejs.git
   cd Partiel_Nodejs
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configuration MongoDB**
   - L'application utilise MongoDB local
   - Assurez-vous que MongoDB est installé et en cours d'exécution
   - La configuration est définie dans `config.env`

4. **Démarrer le serveur**
   ```bash
   # Mode développement (avec nodemon)
   npm run dev
   
   # Mode production
   npm start
   ```

## Utilisation de l'API

### Créer un article
```bash
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mon premier article",
    "content": "Contenu de l'article",
    "author": "John Doe"
  }'
```

### Récupérer tous les articles
```bash
curl http://localhost:3000/api/articles
```

### Récupérer un article par ID
```bash
curl http://localhost:3000/api/articles/[ID_DE_L_ARTICLE]
```

### Supprimer un article
```bash
curl -X DELETE http://localhost:3000/api/articles/[ID_DE_L_ARTICLE]
```

## Structure du projet

```
Partiel_Nodejs/
├── config/
│   └── database.js      # Configuration MongoDB
├── models/
│   └── Article.js       # Modèle Article
├── routes/
│   └── articles.js      # Routes API
├── config.env           # Variables d'environnement
├── package.json         # Dépendances
├── server.js           # Serveur principal
└── README.md           # Documentation
```

## Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de données NoSQL
- **Mongoose** - ODM pour MongoDB
- **CORS** - Middleware pour les requêtes cross-origin
- **dotenv** - Gestion des variables d'environnement

## Contraintes techniques respectées

✅ **Express** - Framework web utilisé  
✅ **Mongoose** - ODM pour MongoDB  
✅ **dotenv** - Gestion des variables d'environnement  
✅ **MongoDB** - Configuration stockée dans config.env  
✅ **Réponses JSON** - Toutes les réponses sont en JSON  
✅ **Statuts HTTP clairs** - 200, 201, 400, 404, 500 selon les cas

## Port par défaut

L'application fonctionne sur le port **3000** par défaut.

## Endpoints disponibles

- `GET /` - Page d'accueil avec documentation
- `GET /api/articles` - Liste tous les articles
- `GET /api/articles/:id` - Récupère un article spécifique
- `POST /api/articles` - Crée un nouvel article
- `DELETE /api/articles/:id` - Supprime un article

## Statuts HTTP utilisés

- **200 OK** - Requête réussie (GET, DELETE)
- **201 Created** - Ressource créée avec succès (POST)
- **400 Bad Request** - Données invalides ou ID invalide
- **404 Not Found** - Article non trouvé
- **500 Internal Server Error** - Erreur serveur interne

## Format des réponses JSON

Toutes les réponses suivent ce format :
```json
{
  "success": true/false,
  "status": 200/201/400/404/500,
  "message": "Message descriptif",
  "data": {...} // Données (si applicable)
}
```

## Tests

Un fichier `.test` est fourni avec toutes les commandes CURL pour tester l'API :

```bash
# Exécuter les tests
bash .test
```

Ou exécuter les commandes individuellement depuis le fichier `.test`. 