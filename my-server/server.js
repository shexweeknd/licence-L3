const express = require('express');
const apiRouter = require('./routes/api');
const database = require('./config/database');

const app = express();
const port = process.env.PORT || 3000;

// Connexion à la base de données
database.connect();

// Middleware pour parser les données en JSON
app.use(express.json());

// Routes API
app.use('/api', apiRouter);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur serveur' });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
