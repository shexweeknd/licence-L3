const fs = require("fs");
const path = require("path");

const metaData = async (req, res) => {
  const filePath = `./${req.body.file}`;

  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.error(
        "Erreur lors de la lecture des métadonnées du fichier :",
        err
      );
      return res.send("Erreur lors de la lecture des métadonnées du fichier");
    }

    const regex = /^[^-]+/;

    const room = path.basename(filePath).match(regex)[0];

    const metaData = {
      name: path.basename(filePath),
      creation: stats.mtime, //TODO change into brithTime
      modification: stats.mtime,
      room: room,
      ip: "127.0.0.1",
      taille: `${stats.size} Octect`,
      resolution: "720x640p",
    };

    res.send(metaData);
  });
};

module.exports = metaData;
