const express = require('express');
const cors = require('cors'); //pour permettre d'echanger des iformations entre les domaines 'PORTS' du même origine

const router = require('./routes/api');
// import database from './config/database';

const app = express();
const port = process.env.PORT || 4000;

// Active le middleware CORS, pas de sécuritée garantie
app.use(cors());

// Connexion à la base de données
// database.connect();

// Middleware pour parser les données en JSON
app.use(express.json());

// Routes API
// On envoie une requete à un point de terminaison BASEURL + /api + route
app.use('/api', router);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Erreur serveur' });
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
