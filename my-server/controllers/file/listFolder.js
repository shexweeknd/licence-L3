const fs = require('fs');
const path = require('path');

const getFilesList = (currentPath) => {
  const filesList = fs.readdirSync(currentPath);
  const result = [];

  filesList.forEach((file) => {
    
    const filePath = path.join(currentPath, file);
    const fileStat = fs.statSync(filePath);
    const item = {
      name: file,
      path: filePath,
      type: fileStat.isDirectory() ? 'folder' : 'file',
    };

    if (fileStat.isDirectory()) {
      item.children = getFilesList(filePath);
    }

    result.push(item);
  });

  return result;
};

const getFilesListFunction = async (req, res) => {
  const response = getFilesList('./storage');
  res.send(response);
}

module.exports = getFilesListFunction;