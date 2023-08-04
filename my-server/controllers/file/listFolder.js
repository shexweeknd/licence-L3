// a modifier car format de l'obj retourné par encore en forme exacte
const fs = require('fs');
const path = require('path');

const getFilesList = (dirPath) => {
  const filesList = {};

  const traverseDir = (currentPath, currentObj) => {
    const files = fs.readdirSync(currentPath);

    files.forEach((file) => {
      const filePath = path.join(currentPath, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isFile()) {
        currentObj[file] = 'file';
      } else if (fileStat.isDirectory()) {
        currentObj[file] = {};
        traverseDir(filePath, currentObj[file]);
      }
    });
  };

  traverseDir(dirPath, filesList);
  return filesList;
};

const directoryPath = '../my-client/src/';
const listFolder = getFilesList(directoryPath);

console.log(filesList);

module.exports = listFolder;