// Obtenez le MediaStream que vous souhaitez enregistrer (par exemple, à partir d'une webcam)
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then(function (stream) {
    // Créez un MediaRecorder avec le MediaStream
    const mediaRecorder = new MediaRecorder(stream);

    // Tableau pour stocker les morceaux de la vidéo
    const chunks = [];

    // Événement lorsqu'un morceau de données est disponible
    mediaRecorder.ondataavailable = function (event) {
      if (event.data.size > 0) {
        chunks.push(event.data);
      }
    };

    // Événement lorsque l'enregistrement est terminé
    mediaRecorder.onstop = function () {
      // Convertissez les morceaux en un objet Blob
      const blob = new Blob(chunks, { type: "video/webm" });

      // Créez un objet URL à partir du Blob
      const videoURL = URL.createObjectURL(blob);

      // Créez un lien pour télécharger la vidéo
      const a = document.createElement("a");
      a.href = videoURL;
      a.download = "enregistrement_video.webm";
      a.textContent = "Télécharger la vidéo";

      // Ajoutez le lien à la page
      document.body.appendChild(a);
    };

    // Commencez l'enregistrement
    mediaRecorder.start();

    // Arrêtez l'enregistrement après une période (par exemple, 10 secondes)
    setInterval(function () {
      mediaRecorder.stop();
    }, 1000); // 10 secondes
  })
  .catch(function (error) {
    console.error("Erreur lors de la capture du MediaStream :", error);
  });

const fs = require("fs");

// Supposons que 'file' est un objet File que vous avez obtenu d'une source quelconque.
const file = new File([blobData], "nom-du-fichier.txt", { type: "text/plain" });

// Chemin vers le répertoire de destination où vous souhaitez enregistrer le fichier.
const destinationPath = "/chemin/vers/le/repertoire/de/destination";

// Écrivez le contenu de l'objet File dans le fichier du répertoire de destination.
fs.writeFileSync(`${destinationPath}/${file.name}`, file.data);

console.log("Fichier enregistré avec succès.");
