const express = require("express");
const {
  checkSent,
  getAllCVs,
  getByUserID,
  getByJobID,
  getByID,
  sendCV,
  deleteCV,
} = require("../controllers/sentCVsController");

const router = express.Router();

router.get("/check/userID/:userID/jobID/:jobID", checkSent);
router.post("/", sendCV);
router.get("/list", getAllCVs);
router.get("/byUserID/:userID", getByUserID);
router.get("/byJobID/:jobID", getByJobID);
router.get("/byID/:id", getByID);
router.delete("/:id", deleteCV);

module.exports = router;
