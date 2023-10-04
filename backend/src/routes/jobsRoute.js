const express = require("express");
const { jobTypes, wkTimeTypes } = require("../controllers/jobsController");

const router = express.Router();

router.get("/jobTypes", jobTypes);
router.get("/wkTimeTypes", wkTimeTypes);

module.exports = router;
