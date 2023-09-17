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
  "/stream-file",
  fileControllers.controllers.streamFile
);

router.get(
  "/download-file",
  auth,
  fileControllers.controllers.downloadFile
);

router.post(
  "/metadata",
  fileControllers.controllers.metaData
)

router.get(
  "/delete-file",
  auth,
  fileControllers.controllers.remFile
)

module.exports = router;