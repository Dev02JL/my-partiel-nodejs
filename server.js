const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Charger les variables d'environnement
dotenv.config({ path: './config.env' });

// Connexion à la base de données
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/articles', require('./routes/articles'));

// Route de base
app.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    status: 200,
    message: 'API Articles - Node.js + Express + MongoDB',
    endpoints: {
      'GET /api/articles': 'Récupérer tous les articles',
      'GET /api/articles/:id': 'Récupérer un article par ID',
      'POST /api/articles': 'Créer un nouvel article',
      'DELETE /api/articles/:id': 'Supprimer un article'
    }
  });
});

// Gestion des erreurs 404
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    status: 404,
    message: 'Route non trouvée'
  });
});

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).json({
    success: false,
    status: 500,
    message: 'Erreur serveur interne',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
  console.log(`Environnement: ${process.env.NODE_ENV}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`Base de données: MongoDB Atlas`);
}); 