const express = require("express");
const router = express.Router();
const authAdmin = require("../middleware/authAdmin.js");

const adminControllers = require("../controllers/admin/adminControllers.js");

router.post(
  "/get-users",
  authAdmin,
  adminControllers.controllers.getUsers
);

router.post(
  "/get-all",
  authAdmin,
  adminControllers.controllers.getPendings
);

router.post(
  "/approve",
  authAdmin,
  adminControllers.controllers.approvePending
);

router.post(
  "/deny",
  authAdmin,
  adminControllers.controllers.denyPending
);

router.post(
  "/delete-record",
  authAdmin,
  adminControllers.controllers.deleteRecord
);

module.exports = router;