const fs = require('fs');
const path = require('path');

let result = [];

const iterate = (currentPath) => {
    const filesList = fs.readdirSync(currentPath);
  
    filesList.forEach((content) => {
      
      const filePath = path.join(currentPath, content);
      const fileStat = fs.statSync(filePath);
  
      if (fileStat.isDirectory()) {
        iterate(filePath);
      }

      if (fileStat.isFile()) {
        result.push(filePath);
      }
    });
  
    return result;
  };

const autoRemove = () => {

    const interval = setInterval(() => {
      list = iterate("./storage");

      //verifier si les éléments de la liste correspondent bien à celle de la date du mois
      list.forEach((filePath) => {
        if (fs.existsSync(filePath)) {
          const stat = fs.statSync(filePath);

          //calculer la date actuelle et la date de création du fichier
          const currentDate = new Date();

          const fileCreationDate = stat.birthtime;

          // Calculer la différence en millisecondes
          const timeDifference = currentDate - fileCreationDate;

          // Calculer le nombre de jours
          const daysDifference = timeDifference / (1000 * 3600 * 24);

          if (daysDifference > 30) {
            try {
              fs.unlink(filePath, () => {
                console.log("...autoremove done for this month...");
              });
            } catch {
              console.log("...autoremove for this month has failed...");
            }
          }
        }
      });

      result = [];
    }
    , 10000);

    return interval;
    }

module.exports = autoRemove;