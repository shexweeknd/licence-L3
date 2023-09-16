const fs = require('fs');
const path = require("path");

const downloadFile = (req, res) => {
  const filePath = req.body.file || req.query.filePath
  const fileName = path.basename(filePath)

  console.log(filePath)
  console.log(fileName)

  res.download(filePath, fileName, function (err){
    if (err) {
     //Handle error, but keep in mind the response may be partially-sent
     //so check res.headersSent
    } else {
     //decrement a download credit, etc.
    }
  })
}

module.exports = downloadFile;