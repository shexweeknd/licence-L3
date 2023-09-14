const express = require("express");
const http = require("http");
const socketServer = require("./socketServer.js")
const cors = require("cors"); //pour permettre d'echanger des iformations entre les domaines 'PORTS' du même origine
// const mongoose = require("mongoose");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const camsRoutes = require("./routes/camsRoutes");
const adminRoutes = require("./routes/adminRoutes.js");

const app = express();
const port = process.env.PORT || process.env.DEV_PORT;

// Active le middleware CORS, pas de sécuritée garantie
app.use(cors());

// Connexion à la base de données
// database.connect();

// Middleware pour parser les données en JSON
app.use(express.json());

// On envoie une requete à un point de terminaison BASEURL + /api + route
app.use("/api/auth", authRoutes);
app.use("/api/cams", camsRoutes);
app.use("/api/admin", adminRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erreur serveur" });
});

const server = http.createServer(app);
socketServer.registerSocketServer(server);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(
//     // Démarrage du serveur
//     server.listen(port, () => {
//       console.log(`Serveur démarré sur le port ${port}`);
//     })
//   )
//   .catch((err) => {
//     console.log("Failed to connect to mongo");
//     console.log(err);
//   });


// Démarrage du serveur
server.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
  })