const express = require('express');
const router = express.Router();
const Article = require('../models/Article.model');

// GET all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    
    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Articles récupérés avec succès',
      count: articles.length,
      data: articles
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Erreur serveur interne',
      error: error.message
    });
  }
});

// GET article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Article non trouvé'
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Article récupéré avec succès',
      data: article
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'ID invalide'
      });
    }
    
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Erreur serveur interne',
      error: error.message
    });
  }
});

// POST new article
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validation des champs obligatoires
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Le titre et le contenu sont obligatoires'
      });
    }

    const article = await Article.create({
      title,
      content,
      author: author || null
    });

    return res.status(201).json({
      success: true,
      status: 201,
      message: 'Article créé avec succès',
      data: article
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Erreur de validation',
        errors: messages
      });
    }

    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Erreur serveur interne',
      error: error.message
    });
  }
});

// DELETE article
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    
    if (!article) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Article non trouvé'
      });
    }

    return res.status(200).json({
      success: true,
      status: 200,
      message: 'Article supprimé avec succès',
      data: article
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        status: 400,
        message: 'ID invalide'
      });
    }
    
    return res.status(500).json({
      success: false,
      status: 500,
      message: 'Erreur serveur interne',
      error: error.message
    });
  }
});

module.exports = router; 