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

// Route GET pour obtenir tous les utilisateurs
router.get('/rooms', (req, res) => {
  // Logique pour récupérer les utilisateurs
  const data = [
    {
      salle: 'amphi',
      ip: '192.168.10.2',
      src: ['192.168.10.2:3000', '192.168.10.2:3001', '192.168.10.2:3002', '192.168.10.2:3003'],
      type: "video/mp4"
    },
    {
      salle: 'salle 16',
      ip: '192.168.10.3',
      src: ['192.168.10.3:3000', '192.168.10.3:3001', '192.168.10.3:3002', '192.168.10.3:3003'],
      type: "video/mp4"
    },
    {
      salle: 'salle 26',
      ip: '192.168.10.4',
      src: ['192.168.10.4:3000', '192.168.10.4:3001', '192.168.10.4:3002', '192.168.10.4:3003'],
      type: "video/mp4"
    }
  ];
  // Envoie les utilisateurs en réponse
  res.json(data);
});

// Exporte les routes
module.exports = router;
