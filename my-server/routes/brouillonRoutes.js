const express = require("express");
const router = express.Router();

const streamFile = require("../brouillon");

router.get(
  "/test",
  streamFile,
)

module.exports = router;