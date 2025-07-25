#!/bin/bash

# Script de test pour l'API Articles
echo "=== Tests API Articles - Node.js + Express + MongoDB ==="

# Vérifier si le serveur est démarré
echo "Vérification du serveur..."
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Erreur: Le serveur n'est pas démarré sur le port 3000"
    echo "Démarrez le serveur avec: npm run dev"
    exit 1
fi
echo "✅ Serveur détecté sur le port 3000"
echo ""

# Test 1: Page d'accueil
echo "Test 1: Page d'accueil"
curl -X GET http://localhost:3000
echo ""
echo ""

# Test 2: Créer un article
echo "Test 2: Créer un article"
RESPONSE=$(curl -s -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"title": "Mon premier article", "content": "Contenu de test", "author": "Jean-Louis"}')
echo $RESPONSE

# Extraire l'ID de l'article créé
ARTICLE_ID=$(echo $RESPONSE | grep -o '"_id":"[^"]*"' | cut -d'"' -f4)
echo "ID de l'article créé: $ARTICLE_ID"
echo ""

# Test 3: Récupérer tous les articles
echo "Test 3: Récupérer tous les articles"
curl -X GET http://localhost:3000/api/articles
echo ""
echo ""

# Test 4: Récupérer un article par ID
if [ ! -z "$ARTICLE_ID" ]; then
    echo "Test 4: Récupérer un article par ID"
    curl -X GET http://localhost:3000/api/articles/$ARTICLE_ID
    echo ""
    echo ""
else
    echo "❌ Impossible de récupérer l'ID de l'article"
fi

# Test 5: Supprimer un article
if [ ! -z "$ARTICLE_ID" ]; then
    echo "Test 5: Supprimer un article"
    curl -X DELETE http://localhost:3000/api/articles/$ARTICLE_ID
    echo ""
    echo ""
else
    echo "❌ Impossible de supprimer l'article (ID manquant)"
fi

# Test 6: Vérifier que l'article a été supprimé
echo "Test 6: Vérifier que l'article a été supprimé"
curl -X GET http://localhost:3000/api/articles
echo ""
echo ""

# Test 7: Test avec ID invalide
echo "Test 7: Test avec ID invalide"
curl -X GET http://localhost:3000/api/articles/invalid-id
echo ""
echo ""

# Test 8: Test validation - article sans titre
echo "Test 8: Test validation - article sans titre"
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"content": "Contenu sans titre"}'
echo ""
echo ""

# Test 9: Test validation - article sans contenu
echo "Test 9: Test validation - article sans contenu"
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"title": "Titre sans contenu"}'
echo ""
echo ""

# Test 10: Test article avec auteur optionnel
echo "Test 10: Test article avec auteur optionnel"
curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d '{"title": "Article sans auteur", "content": "Contenu de l article"}'
echo ""
echo ""

# Test 11: Test route inexistante
echo "Test 11: Test route inexistante"
curl -X GET http://localhost:3000/api/inexistant
echo ""
echo ""

echo "=== Tests terminés ===" 