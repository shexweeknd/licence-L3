const fs = require("fs");

let fileName = null;
let destFilePath = null;

let fileStream = null;

const startRecordingHandler = (salle, date) => {
  const dateObject = extraireAnneeJourMois(date);

  const annee = dateObject.annee;
  const mois = dateObject.mois;
  const jour = dateObject.jour;

  const heureMinuteSeconde = extraireHeureMinuteSeconde(date);

  const yearPath = `./storage/${annee}`;

  const videoFolderPath = `${yearPath}/${jour}-${mois}-${annee}`;

  fileName = `${salle}-${heureMinuteSeconde}`;

  destFilePath = `${videoFolderPath}/${fileName}`;

  verifyAndCreateFolder(videoFolderPath);

   fileStream = fs.createWriteStream(`${destFilePath}.webm`, { flags: 'a' });
};

const recordingHandler = ({ dataSize, fragment }) => {
  try{
    fileStream.write(fragment);
  } catch (err) {
    console.error("reprise de l'écriture de la vidéo impossible, veuillez redémarrer votre caméra")
  }
    
};

const stopRecordingHandler = async (date) => {
  console.log("...recording stopped... at:", date);

  try {
    fileStream.end()
    console.log("Fichier enregistré avec succès.");
  } catch {
    return
  }
};

//----------------fonctions utiles--------------
function extraireAnneeJourMois(dateString) {
  const regexJourMois = /^(\d{4})-(\d{2})-(\d{2})/;
  const correspondance = dateString.match(regexJourMois);
  if (correspondance && correspondance.length === 4) {
    const annee = correspondance[1];
    const mois = correspondance[2];
    const jour = correspondance[3];
    return { annee, mois, jour };
  } else {
    return null;
  }
}

function extraireHeureMinuteSeconde(dateString) {
  const dateObj = new Date(dateString);
  const heure = ("0" + dateObj.getHours()).slice(-2);
  const minute = ("0" + dateObj.getMinutes()).slice(-2);
  const seconde = ("0" + dateObj.getSeconds()).slice(-2);

  // Format de sortie avec des tirets
  const heureAvecTirets = `${heure}-${minute}-${seconde}`;

  return heureAvecTirets;
}

async function verifyAndCreateFolder(cheminDuDossier) {
  if (!fs.existsSync(cheminDuDossier)) {
    fs.mkdir(cheminDuDossier, { recursive: true }, (err) => {
      if (err) {
        console.error("Erreur lors de la création du dossier :", err);
      } else {
        console.log("Dossier créé avec succès !");
      }
    });
  } else {
    console.log("Le dossier existe déjà.");
  }
}
//----------------------------------------------

module.exports = {
  startRecordingHandler,
  recordingHandler,
  stopRecordingHandler,
};
