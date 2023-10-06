const express = require("express");
const { jobTypes, wkTimeTypes } = require("../controllers/jobsController");

const router = express.Router();

router.get("/job-types", jobTypes);
router.get("/wk-time-types", wkTimeTypes);

module.exports = router;
