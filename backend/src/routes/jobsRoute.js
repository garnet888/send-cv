const express = require("express");
const {
  jobTypes,
  wkTimeTypes,
  getList,
  getSortingList,
  getByID,
  addJob,
  editJob,
  deleteJob,
} = require("../controllers/jobsController");

const router = express.Router();

router.get("/job-types", jobTypes);
router.get("/wk-time-types", wkTimeTypes);

router.get("/list", getList);
router.post("/get-sorting", getSortingList);
router.get("/:id", getByID);
router.post("/", addJob);
router.put("/", editJob);
router.delete("/:id", deleteJob);

module.exports = router;
