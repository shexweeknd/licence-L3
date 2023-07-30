// fichier à modifier

// Module pour gérer les chemins de fichiers
const path = require('path');
// Module pour gérer les opérations de fichiers
const fs = require('fs');

// Fonction pour télécharger un fichier
const downloadFile = (req, res) => {
  // Chemin du fichier que vous souhaitez télécharger
  const filePath = 'path/to/your/file.txt';

  // Récupérer le nom du fichier à partir du chemin
  const fileName = path.basename(filePath);

  // Vérifier si le fichier existe
  if (fs.existsSync(filePath)) {
    // Définir les en-têtes de la réponse pour le téléchargement
    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/octet-stream');

    // Créer un flux de lecture du fichier
    const fileStream = fs.createReadStream(filePath);

    // Envoyer le fichier au client en utilisant le flux de lecture
    fileStream.pipe(res);
  } else {
    // Si le fichier n'existe pas, renvoyer une erreur 404
    res.status(404).json({ error: 'Fichier non trouvé' });
  }
};

// Exporter la fonction downloadFile
module.exports = downloadFile