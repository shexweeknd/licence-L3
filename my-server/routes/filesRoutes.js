const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.js");

const fileControllers = require("../controllers/file/fileControllers.js");

router.post(
  "/get-saving-folder",
  auth,
  fileControllers.controllers.listFolder
);

router.get(
  "/download-file",
  fileControllers.controllers.downloadFile
);

router.get(
  "/metadata",
  fileControllers.controllers.metaData
)

module.exports = router;