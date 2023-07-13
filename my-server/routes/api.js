// api.js (fichier de définition des routes)
const express = require('express');

const router = express.Router();

// Route GET pour obtenir tous les utilisateurs
router.get('/users', (req, res) => {
  // Logique pour récupérer les utilisateurs
  const users = [
    {
        id: "1",
        name: "user1"
    },
    {
        id: "1",
        name: "user1"
    }
  ]
  // Envoie les utilisateurs en réponse
  res.json(users);
});

// Exporte les routes
module.exports = router;
