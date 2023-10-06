const express = require("express");
const {
  getPlanJob,
  addEditPlanJob,
} = require("../controllers/planJobController");

const router = express.Router();

router.get("/:userID", getPlanJob);
router.post("/:userID", addEditPlanJob);

module.exports = router;
